
import express, { Application, Request, Response, NextFunction } from "express";
const dotenv = require("dotenv");
import cors, { CorsOptions } from "cors";
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const expressip = require("express-ip");
const listEndpoints = require("express-list-endpoints");

// Middlewares & routes (⚠️ à adapter à tes chemins réels)
//const isAuth = require("./middleware/isAuth");
const debug = require("./middleware/debug");
const userRoutes = require("./routes/user");
const dicRoutes = require( "./routes/dictionaries");
const coursesRoutes = require( "./routes/courses");
const lessonRoutes = require( "./routes/lessons");
const questionRoutes = require( "./routes/questions");

dotenv.config();

const app: Application = express();
const log = console.log;
const isProduction = process.env.NODE_ENV === "production";

// --- Allowed origins ---
const allowedOrigins: (string | undefined)[] = [process.env.ORIGIN];

const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("CORS Not Allowed"));
		}
	},
	credentials: true,
};

// --- Global CORS Headers ---
app.use((req: Request, res: Response, next: NextFunction) => {
	console.log("Client's IP:", (req as any).ipInfo);
	console.log("Incoming request origin:", req.headers.origin);

	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.header("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
	next();
});

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

// --- Development debug middleware ---
if (!isProduction) {
	app.use(debug);
}

// --- Rate Limiter ---
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 min
	max: 1000,
	standardHeaders: true,
	legacyHeaders: false,
});
app.use(limiter);

// --- IP Middleware ---
app.use(expressip().getIpInfoMiddleware);

// --- Security Middlewares ---
app.use(mongoSanitize());
app.use(helmet());

// --- Body Parsers ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Cookie Parser ---
const cookieKey = process.env.SECRET_COOKIE;
app.use(cookieParser(cookieKey || "RANDOM_SECRET_COOKIE_KEY"));

// --- Auth Routes ---
app.use("/auth", userRoutes);

// --- Dev Logging ---
app.use((req: Request, _res: Response, next: NextFunction) => {
	if (!isProduction) log("Request:", req.url, req.method, req.body);
	next();
});

// --- Static Files ---
import path from "path";
app.use(express.static(path.join(__dirname, "public")));

// --- Protected Routes (if needed) ---
// app.use(isAuth);

app.use("/dictionaries", dicRoutes);
app.use("/courses", coursesRoutes);
app.use("/lessons", lessonRoutes);
app.use("/questions", questionRoutes);

// --- Route Listing (dev only) ---
if (!isProduction) {
	log("Routes list:", JSON.stringify(listEndpoints(app), null, 4));
}

export default app;
