import path from 'path'
import fs from 'fs'
import proc from 'process'

var Promise = require("bluebird")
var winston = require('winston')
require('winston-logstash')


function createLogDirectoryIfNeeded(logDirPath) {
    if (!path.isAbsolute(logDirPath)) {
        logDirPath = path.join(
            proc.cwd(), logDirPath)            
    }
    var stat = Promise.promisify(fs.stat)
    var mkdir = Promise.promisify(fs.mkdir)
    
    return stat(logDirPath)
        .then(function (statContent) {
            if (!statContent) {
                mkdir(logDirPath)
            }
        })
        .catch(function (error) {
            console.log(error)
            proc.exit(-1);            
        })
}


function addTransports(config) {
    const logDirPath = config.LOG_DIR_PATH
    const logFilePrefix = config.LOG_FILE_PREFIX
    return winston
        .add(winston.transports.File, {
            name: 'info-file',
            filename: logDirPath + logFilePrefix + '-info' + '.log',
            level: 'info'            
        })
        .add(winston.transports.Logstash, {
            port: config.LOGSTASH_INPUT_PORT,
            node_name: config.LOGSTASH_NODE_NAME,
            host: config.LOGSTASH_HOST
        })            
        .add(winston.transports.File, {
            name: 'error-file',
            filename: logDirPath + logFilePrefix + '-error' + 'log',
            level: 'error'
        })
        .add(winston.transports.Console, {
            name: 'debug-stdout',
            level: 'debug'                
        })    
} 

export default function configureLogger(config) {
    return createLogDirectoryIfNeeded(config.LOG_DIR_PATH)
        .then(() => addTransports(config))
        .catch(err => console.log(err))
}