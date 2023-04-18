/*
    ***  Express app  ***
*/

const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
//Sec middlewares
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require("helmet")
//Auth middlewares
const isAdmin = require('./middleware/isAdmin')
const isAuth = require('./middleware/isAuth')
//Routes
const userRoutes = require('./routes/user')
const dicRoutes = require('./routes/dictionaries')
const coursesRoutes = require('./routes/courses')

const cookieParser = require('cookie-parser')
//const bodyParser = require('body-parser');

const isProduction = process.env.NODE_ENV === 'production' 


app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')
    next()
})
app.use(cors({origin: !isProduction, credentials: true}))

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
//app.use(bodyParser.urlencoded({ extended: true }))
//app.use(bodyParser.json({ type: 'multipart/form-data', limit: '50mb' }))

// Auth middlewares
const cookieKey = process.env.SECRET_COOKIE
app.use(cookieParser(cookieKey ? cookieKey : "RANDOM_SECRET_COOKIE_KEY")) // Put cookie in the body
app.use('/auth', userRoutes)

app.use(isAuth) // Check user authentification
app.use((req, res, next) => { 
    console.log(req.url, req.body)
    next()
})
app.use(isAdmin) // Next routes are restricted for admins
app.use('/dictionaries', dicRoutes)


app.use('/courses', coursesRoutes)

module.exports = app // For testing