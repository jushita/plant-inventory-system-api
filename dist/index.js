"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./services/logger");
var awsServerlessExpress = require('aws-serverless-express');
var app = require('./app');
var server = awsServerlessExpress.createServer(app);
var LOGGER = logger_1.Logger.getLogger();
logger_1.Logger.configure({
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
LOGGER.info("Version: " + process.version);
LOGGER.info("Initializing server");
exports.handler = function (event, context) {
    awsServerlessExpress.proxy(server, event, context);
};
