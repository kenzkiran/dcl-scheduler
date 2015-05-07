var bunyan = require('bunyan');
var logger;

var createLogger = function() {
    if (logger) {
        return logger;
    }

    logger = bunyan.createLogger({
        name: 'myapp',
        stream: process.stdout,
        level: 'info'
    });
    return logger;
};

var testlogger = function() {
    var logFunc = function(data, msg) {
        console.log(msg);
        if( data )
            console.log(JSON.stringify(data));
    };
    return {
        info: logFunc ,
        error: logFunc
    }
}

//module.exports = testlogger;
module.exports = createLogger;