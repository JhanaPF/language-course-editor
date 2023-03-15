const mongoose = require('mongoose')
const app = require('../app').server

const errorHandler = error => {
    if (error.syscall !== 'listen') throw error
    
    const server = app.server
    console.log(server) // Without this log, enable to access server adress
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

const normalizePort = val => { // Return valid port
    const port = parseInt(val, 10)
   
    if (isNaN(port))  return val
    else if (port >= 0) return port
    else return false
}

const isIdValid = (id) => {
    return mongoose.Types.ObjectId.isValid(id)
}

module.exports = {
    normalizePort,
    errorHandler,
    isIdValid,
};