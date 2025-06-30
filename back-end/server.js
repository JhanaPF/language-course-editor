/*
	***     Node server     ***
*/

require("dotenv").config()
const isProduction = process.env.NODE_ENV === "production"

const http = require("http")
const app = require("./app")
const mongoose = require("mongoose")

const serverUtil = require("./utils/serverUtils")

if (!isProduction) {
	console.log('\x1b[31m%s\x1b[0m', 'Development mode, default variables will be used');
	process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0 // Deactivate ssl
}

if (!process.env.DATABASE) {
	throw new Error("DATABASE is not defined in your environment variables.");
}

mongoose.connect(process.env.DATABASE,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 1000,
		socketTimeoutMS: 2000,
	})
	.then(() => console.log("Connected to Mongo !"))
	.catch((err) => {
		console.dir(err)
		console.log("Failed to connect to Mongo database")
		process.exit(1)
	})


if (!process.env.PORT) {
	throw new Error("PORT is not defined in your environment variables.");
}

const port = serverUtil.normalizePort(process.env.PORT)
app.set("port", port)

const server = http.createServer(app)
server.on("error", (err) => serverUtil.errorHandler(err, port))
server.on("listening", () => {
	const address = server.address()
	const bind = typeof address === "string" ? "pipe " + address : "port " + port
	console.log("Listening on " + bind)
})

server.listen(port) 