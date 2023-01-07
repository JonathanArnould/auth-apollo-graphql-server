import dotenv from 'dotenv';

dotenv.config();


const serverConfig = {
  dev: {
    uri: 'mongodb://localhost:27017/save-my-games-dev',
    apolloPort: 5000,
    autoListen: false,
    verbose: true,
  },
  prod: {
    uri: 'mongodb://localhost:27017/save-my-games-prod',
    apolloPort: 5000,
    autoListen: false,
    verbose: true,
  }
};

export default serverConfig;