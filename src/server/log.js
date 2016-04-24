import path from 'path'
import fs from 'fs'
import proc from 'process'
var winston = require('winston')

function getLogger() {
    // Create log directory if doesn't exists
    const logDirPath = path.join(proc.cwd() + '/logs/');
    if (!fs.existsSync(logDirPath)){
        try {
            fs.mkdirSync(logDirPath);    
        } catch (error) {
            console.log(error)
            proc.exit(-1);
        }
    }    
    const dateObj = new Date();
    const date = dateObj.getFullYear() + dateObj.getMonth() + dateObj.getDay()
    const logFilePrefix = "blog"

    var logger = winston    
    logger
        .add(winston.transports.File,
            {
                name: 'info-file',
                filename: logDirPath + logFilePrefix + '-info' + date + '.log',
                level: 'info'            
            })
        .add(winston.transports.File,
            {
                name: 'error-file',
                filename: logDirPath + logFilePrefix + '-error' + date + 'log',
                level: 'error'
            })
        .add(winston.transports.Console, 
            {
                name: 'debug-stdout',
                level: 'debug'                
            })
    return logger;    
}

var logger = getLogger()

module.exports = logger
export default logger