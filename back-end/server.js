/*
    ***     Node server     ***
*/

const http = require('http') 
const app = require('./app')
//const path = require('path')
//require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') }) 
require('dotenv').config()

const mongoose = require('mongoose')
const {user} = require('./schemas.js')
const isProduction = process.env.NODE_ENV === 'production' 
if(!isProduction) process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0 // Delete Tls encryption, security failure for devlopment

mongoose.connect( isProduction ? process.env.DATABASE : 'mongodb://localhost:27017/dictionnaries', { useNewUrlParser: true,  useUnifiedTopology: true })
.then(() => console.log('Connected to Mongo !'))
.catch(() => {
    console.log('failed to connect to Mongo Cluster, will try to local database')
    
    // const admin = {
    //     name: "admin",
    //     mail: "admin@gmail.com",
    //     password: "$2a$12$ZU.b4rN0S4Eu0xPnLPN79u9BgUOCxYE9BQk.2YNkdXmlPU9HQRiyW", // Rthyu--77
    // }
    // const newAdmin = new user(admin)
    // newAdmin.save()
    // .then(() => console.log("admin persisted"))
    // .catch((err) => console.log("didn't persist admin", err))
      
     
    process.exit(1)
})

const normalizePort = val => { // Return valid port
    const port = parseInt(val, 10)
   
    if (isNaN(port))  return val
    else if (port >= 0) return port
    else return false
}

const port = normalizePort(process.env.PORT || '3001')
app.set('port', port) 

const errorHandler = error => {
    if (error.syscall !== 'listen') throw error

    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.')
            process.exit(1)
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.')
            process.exit(1)
        default:
            throw error
    }
}

const server = http.createServer(app)
server.on('error', errorHandler)
server.on('listening', () => {
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
    console.log('Listening on ' + bind)
})
server.listen(port) 