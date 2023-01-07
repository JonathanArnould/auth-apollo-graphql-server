import { gql } from "apollo-server";

const AuthType = gql`
    type AuthLoginResponse {
        nickname: String
        email: String
        id: String
        token: String
    }

    type AuthRegisterResponse {
        nickname: String
        email: String
        id: String
    }

    type MeResponse {
        nickname: String
        email: String
        id: ID
    }

    input LoginArgs {
        email: String
        password: String
    }

    input RegisterArgs {
        nickname: String
        email: String
        password: String
    }

    type Query {
        me: MeResponse
    }

    type Mutation {
        login(args: LoginArgs): AuthLoginResponse
        register(args: RegisterArgs): AuthRegisterResponse
    }`

export default AuthType;