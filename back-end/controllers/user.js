const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { userValidation } = require("../validators/validators.js")
require("dotenv").config()
const {user} = require("../schemas/schemas.js")
const cookie = require("cookie")
const log = console.log

router.token = (req, res) => { // Token is valid
	return res.status(200).json()
}

router.signup = (req, res) => {
	body = req.body
	log("Sign up", body)
    
	const validation = userValidation.validate(body)
	if(validation.error) { 
		log(validation.error) 
		return res.status(500)
	}

	body.mail = body.mail.toLowerCase()

	bcrypt.hash(req.body.password, 12)
		.then(hash => {
        
			const newUser = new user({
				name,
				mail,
				password: hash
			})
        
			newUser.save()
				.then(() => res.status(201).json({ message: "New user registered" }))
				.catch(error => {
					log(error)
					res.status(400)
				})
		})
		.catch(error => {
			log(error)
			res.status(500)
		})
}

router.signin = (req, res) => {
	const {mail, password} = req.body
	if(!mail || !password) return res.status(401).json()
	log("User connection attempt " + mail)

	user.findOne({ mail })
		.then(userFound => {

			bcrypt.compare(password, userFound.password)
				.then(valid => {
					if (!valid) {
						log("Connexion attempt with invalid password")
						return res.status(401).json({ error: "Wrong password" })
					}

					const token = jwt.sign(
						{userId: userFound._id, mail, role: userFound.role},
						process.env.SECRET ? process.env.SECRET : "RANDOM_TOKEN_SECRET",
						{expiresIn: "8760h"} // A year
					)

					const my_cookieJson = JSON.stringify(token)

					const cookieOptions = {
						httpOnly: true, // So the client code cant access it
						secure: process.env.NODE_ENV === "production", // Cookie not send if connection is not https
					} 

					const cookieValue = cookie.serialize("token", my_cookieJson, cookieOptions)
            
					res.cookie("credentials", cookieValue, { signed: true, sameSite: "strict" })
					res.status(200).json({userId: userFound._id,})
					log("User connection success")
				})
				.catch(error => {
					log(error)
					return res.status(500).json({ error : "Passwords hash comparison error"})
				})

		})
		.catch(error =>  {
			log(error)
			return res.status(500).json({ error : "No user corresponding found"}) 
		})
}

module.exports = router