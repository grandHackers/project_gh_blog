var process = require('process')
var fs = require('fs')
var env = process.env

const serverConfig = {
	APP_PORT:                   8080,
    DB_HOST:                    env.MONGO_PORT_27017_TCP_ADDR || env.DB_HOST || 'localhost',
    DB_PORT:                    env.DB_PORT || 27017, 
    DB_NAME:                    env.DB_NAME || 'blog',
    SUBDIR_URL:                 env.SUBDIR_URL || '',
    API_URL:                    env.API_URL || '/api',
}

const clientConfig = {
    API_URL: serverConfig.API_URL,
    SUBDIR_URL: serverConfig.SUBDIR_URL
}

const authConfig = {
    google: {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackURL: env.GOOGLE_REDIRECT_URL
    }
}

function writeConfigToFile(config, path) {    
    console.log("Writing configuration file to " + path)   
    content = "export default " + JSON.stringify(config)
    fs.writeFile(path, content, function (err) {        
        if (err) { // TODO log
            throw err; 
        }
     
    })        
}

writeConfigToFile(serverConfig, __dirname + "/config/server-config.js")
writeConfigToFile(clientConfig, __dirname + "/config/client-config.js")
writeConfigToFile(authConfig, __dirname + "/config/auth.js")