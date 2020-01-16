import { Logger } from "./services/logger";

const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
const server = awsServerlessExpress.createServer(app);

const LOGGER = Logger.getLogger();
Logger.configure({
    appenders: {
        out: {
            type: 'stdout'
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: process.env.LOG_LEVEL || 'debug'
        }
    }
});

LOGGER.info(`Version: ${process.version}`);
LOGGER.info(`Initializing server`);


exports.handler = (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
}