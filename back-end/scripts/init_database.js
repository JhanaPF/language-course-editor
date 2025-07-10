const mongoose = require("mongoose")
require("dotenv").config()
//const isProduction = process.env.NODE_ENV === "production"
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const { raw } = require("express");


// Add admin accounts 

function generateRandomPassword(length = 16) {
	if (length < 2) {
		throw new Error("La longueur doit être au moins 2 pour contenir majuscule et spécial");
	}

	const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
	const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const digitChars = '0123456789';
	const specialChars = '#?!@$%^&*-';

	let passwordChars = [
		uppercaseChars.charAt(crypto.randomInt(0, uppercaseChars.length)),
		specialChars.charAt(crypto.randomInt(0, specialChars.length)),
	];

	const allChars = lowercaseChars + uppercaseChars + digitChars + specialChars;

	for (let i = passwordChars.length; i < length; i++) {
		passwordChars.push(allChars.charAt(crypto.randomInt(0, allChars.length)));
	}

	for (let i = passwordChars.length - 1; i > 0; i--) {
		const j = crypto.randomInt(0, i + 1);
		[passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
	}

	return passwordChars.join('');
}

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
db = mongoose.connection

db.on("error", console.error.bind(console, "Connection error:"))
db.once("open", async function () {
	console.log("Connecté à Mongoose")
	
	const saltRounds = 12;
	const rawPassword = generateRandomPassword(30);
	console.log(rawPassword)
	const hashedPassword = await bcrypt.hash(rawPassword, saltRounds);

	const admin = {
		name: "admin",
		mail: "admin@example.com",
		password: hashedPassword,
		role: "admin",
	}

	const superAdmin = {
		name: "superAdmin",
		mail: "superadmin@example.com",
		password: hashedPassword,
		role: "superAdmin",
	}

	const addAdmins = new Promise((resolve, reject) => {

		const collection = db.collection("users")

		collection.insertMany([admin, superAdmin])
			.then((results) => resolve({ message: "Admin and Superadmin persisted", results }))
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