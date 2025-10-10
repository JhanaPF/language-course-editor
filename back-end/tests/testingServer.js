/*
    *** Light version of the server express app  ***
*/

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
//const isAuth = require('./middleware/isAuth')
const userRoutes = require('../routes/user');
const dicRoutes = require('../routes/dictionaries');
const coursesRoutes = require('../routes/courses');
const lessonRoutes = require('../routes/lessons');
const questionRoutes = require('../routes/questions');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 1000, 
	standardHeaders: true, 
	legacyHeaders: false, 
});
app.use(limiter);
app.use(cors({
	origin: false, 
	credentials: true, 
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
	allowedHeaders: 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
}));
app.use(mongoSanitize());
app.use(helmet());
app.use(express.json()); // Put body in req object for all request with Content-Type: application/json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('RANDOM_SECRET_COOKIE_KEY'));

app.use('/auth', userRoutes);
app.use(express.static(__dirname + '/public')); 
app.use('/dictionaries', dicRoutes);
app.use('/courses', coursesRoutes);
app.use('/lessons', lessonRoutes);
app.use('/questions', questionRoutes);

module.exports = app; 