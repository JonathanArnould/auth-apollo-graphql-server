import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { applyMiddleware } from "graphql-middleware";
import mongoose from "mongoose";
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/schema/index.js";
import { makeExecutableSchema } from '@graphql-tools/schema'
import authenticate from "./middlewares/authenticate.js";


const startServer = async (config) => {
    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const schemaWithMiddleware = applyMiddleware(schema, authenticate)

    const server = new ApolloServer({
        schema: schemaWithMiddleware,
        plugins: [
            // Install a landing page plugin based on NODE_ENV
            process.env.SERVER_STAGE === 'prod'
            ? ApolloServerPluginLandingPageDisabled()
            : ApolloServerPluginLandingPageLocalDefault(),
        ],
        context: ({ req }) => {
            return { req };
        },
        
    });

    try {
        await server.listen(config.apolloPort);
        console.log(
        `Apollo server started at: http://localhost:${config.apolloPort}/`,
        `\nStart server with config ${JSON.stringify(config, null, 2)}`
        );
    } catch (error) {
        throw new Error(`Unable to start Apollo server: ${error.message}`);
    }
    try {
        await mongoose
        .set('strictQuery', true)
        .connect(config.uri)
        .then(() => console.log('Connected to database'));
    } catch (error) {
        console.log(error);
    }

    if (config.verbose) console.log('mongodb started at uri: ', config.uri);
    return server;
};

export default startServer;