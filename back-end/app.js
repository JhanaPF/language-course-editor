/*
    ***  Express app  ***
*/

const express = require('express')
const app = express()
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require("helmet")
const cookieParser = require('cookie-parser')
require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production' 

const auth = require('./middleware/auth')
const userRoutes = require('./routes/user')
const dicRoutes = require('./routes/dictionnaries')
const coursesRoutes = require('./routes/courses');
const isAdmin = require('./middleware/isAdmin');


const bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: true }))
//app.use(bodyParser.json({ type: 'multipart/form-data', limit: '50mb' }))


app.use((req, res, next) => { 
    console.log(req.body, req.url)
    
    if(!isProduction)
        res.setHeader('Access-Control-Allow-Origin', '*') // Autorise CORS, security failure for development 
    
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')
    res.header("Access-Control-Allow-Credentials", true);
    next()
})

app.use(cors())
// --- Security middlewares ---
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter)
app.use(mongoSanitize())
app.use(helmet())
//  --------------------------

app.use(express.json()) // Put body in req object for all request with Content-Type: application/json
app.use(cookieParser()) // Put cookie in the body
app.use('/auth', userRoutes)
app.use(auth) // Decode token

app.use(isAdmin)
// Protected routes
app.use('/dictionaries', dicRoutes)
app.use('/courses', coursesRoutes)

module.exports = app // For testing