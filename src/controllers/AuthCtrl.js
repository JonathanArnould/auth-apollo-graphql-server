import { UserModel } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AuthCtrl = () => {
    const me = async (context) => {
        try {
            const { user } = context;
            const { _id, nickname, email} = await UserModel.findById(user.id);

            return { id: _id, nickname, email};
        } catch (e) {
            console.log('Error: ', e);
            return {}
        }
    }

    const login = async (args) => {
        const { email, password } = args;

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new Error('Email does not exist');
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            throw new Error('Wrong password');
        }

        const { nickname, _id } = user;
        const token = jwt.sign( 
            { email, id: _id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRES }
        );

        return { email, nickname, id: _id, token };
    }

    const register = async (args) => {
        const { email, password, nickname } = args;
        
        const userAlreadyExist = await UserModel.find({ email });
        
        if (userAlreadyExist.length !== 0) {
            throw new Error(
              "Email address already exists, please use another one",
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let user = new UserModel({
            nickname,
            email,
            password: hashedPassword
        });

        const { _id } = await user.save();
        return { id: _id, nickname, email};

    }

    return {
        me,
        login,
        register
    }
}

export default AuthCtrl;