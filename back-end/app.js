/*
      Express app
*/

const express = require('express')
const app = express()
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require("helmet")

const crudRoutes = require('./routes/dictionnaries')
const userRoutes = require('./routes/user')

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(limiter)
app.use(mongoSanitize())
app.use(helmet())

if(process.env["NODE_ENV"] === "production") app.use(cors())

app.use((req, res, next) => { 
      res.setHeader('Access-Control-Allow-Origin', '*') // Autorise CORS, security failure for development 
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')
      next()
}) 

app.use(express.json()) // Put body in req object for all request with Content-Type: application/json

app.use('/crud', crudRoutes) 
app.use('/auth', userRoutes) 


module.exports = app