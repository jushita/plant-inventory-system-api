"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log4js_1 = require("log4js");
var context = require('express-cls-hooked');
var Logger = /** @class */ (function () {
    function Logger(name) {
        this.name = name;
    }
    Logger.configure = function (config) {
        log4js_1.configure(config);
    };
    Logger.getLogger = function (name) {
        return new this(name || 'default');
    };
    Logger.prototype.log = function (level, message) {
        log4js_1.getLogger(this.name).log(level, this.formatMessage(message));
    };
    Logger.prototype.fatal = function (message) {
        log4js_1.getLogger(this.name).fatal(this.formatMessage(message));
    };
    Logger.prototype.error = function (message) {
        log4js_1.getLogger(this.name).error(this.formatMessage(message));
    };
    Logger.prototype.warn = function (message) {
        log4js_1.getLogger(this.name).warn(this.formatMessage(message));
    };
    Logger.prototype.info = function (message) {
        log4js_1.getLogger(this.name).info(this.formatMessage(message));
    };
    Logger.prototype.debug = function (message) {
        log4js_1.getLogger(this.name).debug(this.formatMessage(message));
    };
    Logger.prototype.formatMessage = function (message) {
        var id = context.get('id');
        if (!id || id === '') {
            return message;
        }
        return id + " - " + message;
    };
    return Logger;
}());
exports.Logger = Logger;
