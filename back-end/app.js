/*
      Express app
*/

const express = require('express')
const app = express()
const saveRoutes = require('./routes/save')
const fetchRoutes = require('./routes/fetch')
const userRoutes = require('./routes/user')
//const cors = require('cors')
//app.use(cors())

app.use((req, res, next) => { 
      res.setHeader('Access-Control-Allow-Origin', '*') // Autorise CORS, security failure for development 
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')
      next()
}) 

app.use(express.json()) // Put body in req object for all request with Content-Type: application/json

app.use('/save', saveRoutes) // CRUD
app.use('/fetch', fetchRoutes) 
app.use('/auth', userRoutes) 

module.exports = app