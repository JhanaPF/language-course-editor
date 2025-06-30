/*
	***  Express app  ***
*/

const express = require("express")
const app = express()
require("dotenv").config()
const log = console.log
const cors = require("cors")
const cookieParser = require("cookie-parser")
const isProduction = process.env.NODE_ENV === "production"

// Sec middlewares
const rateLimit = require("express-rate-limit")
const mongoSanitize = require("express-mongo-sanitize")
const helmet = require("helmet")

// Middlewares
const isAuth = require('./middleware/isAuth')
const debug = require('./middleware/debug')

// Routes
const userRoutes = require("./routes/user")
const dicRoutes = require("./routes/dictionaries")
const coursesRoutes = require("./routes/courses")
const lessonRoutes = require("./routes/lessons")
const questionRoutes = require("./routes/questions")

const allowedOrigins = [
	'http://localhost:3000/',
	process.env.ORIGIN,
];

const corsOptions = {
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('CORS Not Allowed'));
		}
	},
	credentials: true,
};

app.use((req, res, next) => {
	console.log("Client's ip:", req.ipInfo)
	console.log('Incoming request origin:', req.headers.origin);
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization")
	res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE")
	next()
})

//app.options('*', cors(corsOptions))
//app.use(cors(corsOptions))

if(!isProduction) {
	app.use(debug)
}

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(limiter)

const expressip = require("express-ip")
app.use(expressip().getIpInfoMiddleware)

app.options('*', (req, res) => {
	res.sendStatus(200);
});



// --- Security middlewares ---
app.use(mongoSanitize())
app.use(helmet())
//  --------------------------

app.use(express.json()) // Put body in req object for all request with Content-Type: application/json
app.use(express.urlencoded({ extended: true }))

// Auth middlewares
const cookieKey = process.env.SECRET_COOKIE
app.use(cookieParser(cookieKey ? cookieKey : "RANDOM_SECRET_COOKIE_KEY")) // Put cookie in the body
app.use("/auth", userRoutes)

app.use((req, res, next) => {
	if (!isProduction) log("Request:", req.url, req.method, req.body)
	next()
})
app.use(express.static(__dirname + "/public")) // Files

// Next routes needs authentication
//app.use(isAuth) 

app.use("/dictionaries", dicRoutes)
app.use("/courses", coursesRoutes)
app.use("/lessons", lessonRoutes)
app.use("/questions", questionRoutes)

const listEndpoints = require("express-list-endpoints")
if(!isProduction) {
	log("Routes list: ", JSON.stringify(listEndpoints(app), null, 4))
}

module.exports = app