import { AuthCtrl } from "../../controllers/index.js";

const AuthResolver = () => {
    const me = async (context) => {
        const { id, email, nickname } = await AuthCtrl().me(context);
        return { id, nickname, email};
    };

    const login = async (args) => {
        const { id, email, nickname, token } = await AuthCtrl().login(args);

        return { email, nickname, id, token };
    }

    const register = async (args) => {
        const { id, email, nickname } = await AuthCtrl().register(args);
        
        return { id, nickname, email};
    }

    return {
        login,
        register,
        me
    }
}

export default AuthResolver;