import startServer from './server.js';
import serverConfig from './_config/server-config.js';
import dotenv from 'dotenv';

dotenv.config()

const { SERVER_STAGE } = process.env;

if (!SERVER_STAGE) {
    throw new Error('SERVER_STAGE must be defined');
}

startServer(serverConfig[SERVER_STAGE]);
