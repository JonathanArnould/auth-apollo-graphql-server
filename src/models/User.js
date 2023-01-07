import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nickname: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
