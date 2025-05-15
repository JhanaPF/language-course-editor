/*
    ***     Node server     ***
*/

const http = require("http")
const app = require("./app")
require("dotenv").config()
const serverUtil = require("./utils/serverUtils")
const mongoose = require("mongoose")
const isProduction = process.env.NODE_ENV === "production"
if (!isProduction) {
	console.log(chalk.red('Running app in development mode, default variables will be used'))
	process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0 // Deactivate ssl
}

mongoose.connect(isProduction ? process.env.DATABASE : "mongodb://localhost:27017/courses",{
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

const port = serverUtil.normalizePort(process.env.PORT || "3001")
app.set("port", port)

const server = http.createServer(app)
server.on("error", (err) => serverUtil.errorHandler(err, port))
server.on("listening", () => {
	const address = server.address()
	const bind = typeof address === "string" ? "pipe " + address : "port " + port
	console.log("Listening on " + bind)
})
server.listen(port) 