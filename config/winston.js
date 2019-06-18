const winston = require('winston');

let fila = {
    level : 'silly',
    filename : '/../logs/app.log',
    format : winston.format.json(),

}

let consola = {
    level : 'debug',
    format : winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    )
}

let logger = winston.createLogger({
    transports : [
        new winston.transports.File(fila),
        new winston.transports.Console(consola)
    ]
})

logger.stream = {
    write : function(message,encoding){
        logger.info(message);
    }
}

module.exports=logger;