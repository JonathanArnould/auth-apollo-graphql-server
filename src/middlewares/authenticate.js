import jwt from "jsonwebtoken";

const authenticate = (resolve, parent, args, context, info) => {
    if (!['Login', 'Register'].includes(context.req.body.operationName)) {
        try {
        const token = context.req.headers.authorization;
        const { email, id } = jwt.verify(
            token.split(' ')[1],
            process.env.JWT_SECRET_KEY
        );
        context.user = { email, id };
        return resolve(parent, args, context, info);
        } catch (e) {
        console.log('Error: ', e)
        throw new AuthenticationError('Authentication token is invalid, please log in');
        }
    }
    return resolve(parent, args, context, info);
};

export default authenticate;