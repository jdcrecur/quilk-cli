'use strict';
let env = process.env.ENV || 'development',
    winston = require('winston');

let customLevels = {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7
};

let transports = [];

if (env === 'development') {
    transports.push(new (winston.transports.Console)({
        colorize: true,
        timestamp: true,
        handleExceptions: true,
        json: false
    }));
}

let logger = new (winston.Logger)({
    levels: customLevels,
    transports: transports,
    exitOnError: false
});

let orginalLogger = logger.log;

//Extend log for Error Objects
logger.log = (level, msg, msgObj) => {
    var objType = Object.prototype.toString.call(msgObj);
    if (objType === '[object Error]') {
        orginalLogger.call(logger, level, msg, msgObj.toString());
    } else if (typeof(msgObj) !== 'undefined') {
        orginalLogger.call(logger, level, msg, msgObj);
    } else {
        orginalLogger.call(logger, level, msg);
    }
};

module.exports = {

    emerg: (msg, msgObj) => {
        logger.emerg(msg, msgObj);
    },
    alert: (msg, msgObj) => {
        logger.alert(msg, msgObj);
    },
    crit: (msg, msgObj) => {
        logger.crit(msg, msgObj);
    },
    error: (msg, msgObj) => {
        logger.error(msg, msgObj);
    },
    warning: (msg, msgObj) => {
        logger.warning(msg, msgObj);
    },
    notice: (msg, msgObj) => {
        logger.notice(msg, msgObj);
    },
    info: (msg, msgObj) => {
        logger.info(msg, msgObj);
    },
    debug: (msg, msgObj) => {
        logger.debug(msg, msgObj);
    },
    winston: logger
};