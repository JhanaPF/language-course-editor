const mongoose = require("mongoose")
require("dotenv").config()
const isProduction = process.env.NODE_ENV === "production" 


// Use this script to add admin accounts 

mongoose.connect(isProduction ? process.env.DATABASE : "mongodb://localhost:27017/dictionaries", { useNewUrlParser: true,  useUnifiedTopology: true })
db = mongoose.connection

db.on("error", console.error.bind(console, "Connection error:"))
db.once("open", function () {
	console.log("Connecté à Mongoose")

	const addAdmins = new Promise((resolve, reject) => {
 
		const admin = {
			name: "admin",
			mail: "admin@gmail.com",
			password: "$2a$12$sElZzYlhPZjAxk7XGLrx2ubXBhhgZ4Zu3p0Pp/xPpdiJFF5HRtaIS", // Azerty-1234
			role: "admin",
		}

		const superAdmin = {
			name: "superAdmin",
			mail: "superadmin@gmail.com",
			password: "$2a$12$sElZzYlhPZjAxk7XGLrx2ubXBhhgZ4Zu3p0Pp/xPpdiJFF5HRtaIS", // Azerty-1234
			role: "superAdmin",
		}
        
		const collection = db.collection("users")

		collection.insertMany([admin, superAdmin])
			.then((results) => resolve({message:"Admin and Superadmin persisted", results}))
			.catch((err) => reject(err))
	})

	addAdmins
		.then((value) => {
			console.log(value)
			process.exit()
		})
		.catch((error) => {
			console.log("didn't persist admin, probably already exists")
			console.log(error)
			process.exit(1)
		})
})