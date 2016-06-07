import mongoose from 'mongoose'

export default function connectToDB(host, port, dbName) {
    const mongoUrl = `mongodb://${host}:${port}/${dbName}`
    try {
        console.log("Connecting to database at " + mongoUrl)
        mongoose.connect(mongoUrl); 
    } catch(err) {
        // TODO implement better error handling
        console.error(`Failed when trying to connect to database at ${mongoUrl}:${err}`)
        throw err
    }
}