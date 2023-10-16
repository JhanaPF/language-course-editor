const mongoose = require("mongoose")

const errorHandler = (error, port) => {
	if (error.syscall !== "listen") throw error
	switch (error.code) {
	case "EACCES":
		console.error("port " + port + " requires elevated privileges.")
		process.exit(1)
	case "EADDRINUSE":
		console.error("port " + port + " is already in use.")
		process.exit(1)
	default:
		throw error
	}
}

const normalizePort = val => { // Return valid port
	const port = parseInt(val, 10)
   
	if (isNaN(port))  return val
	else if (port >= 0) return port
	else return false
}

const isIdValid = (id) => {
	return mongoose.Types.ObjectId.isValid(id)
}

module.exports = {
	normalizePort,
	errorHandler,
	isIdValid,
}