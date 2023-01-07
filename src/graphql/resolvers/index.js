import AuthResolver from "./AuthResolver.js";

const resolvers = {
    Query: {
        me: (parent, { args }, context) => AuthResolver().me(context)
    },
    Mutation: {
        login: (parent, { args }, context) => AuthResolver().login(args),
        register: (parent, { args }, context) => AuthResolver().register(args)
    }
}

export default resolvers;