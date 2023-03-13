/*
    ***     Node server     ***
*/

const http = require('http')
const app = require('./app')
//const path = require('path')
//require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') }) 
require('dotenv').config()
const serverUtil = require('./utils/serverUtils')
const mongoose = require('mongoose')
const isProduction = process.env.NODE_ENV === 'production' 
if(!isProduction) process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0 // Delete Tls encryption, security failure for devlopment

mongoose.connect( isProduction ? process.env.DATABASE : 'mongodb://localhost:27017/dictionnaries', { useNewUrlParser: true,  useUnifiedTopology: true })
.then(() => console.log('Connected to Mongo !'))
.catch(() => {
    console.log('Failed to connect to Mongo database')
    process.exit(1)
})

const port = serverUtil.normalizePort(process.env.PORT || '3001')
app.set('port', port) 

const server = http.createServer(app)
server.on('error', serverUtil.errorHandler)
server.on('listening', () => {
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
    console.log('Listening on ' + bind)
})
server.listen(port) 