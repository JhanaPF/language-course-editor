const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator =  require('validator')
const { userValidation } = require('../validators/validators.js')
require('dotenv').config()
const {user} = require('../schemas/schemas.js')
const cookie = require('cookie')

router.token = (req, res) => { // Just check if token is valid
    console.log("hello")
   console.dir(req.cookies)
}

router.signup = (req, res) => {
    console.log("Sign up", req.body)
    
    const validation = userValidation.validate(req.body)
    if(validation.error) { 
        console.log(validation.error) 
        return res.status(500)
    }

    bcrypt.hash(req.body.password, 12)
    .then(hash => {
        
        const newUser = new user({
            name: req.body.name,
            mail: req.body.mail,
            password: hash
        })
        
        newUser.save()
        .then(() => res.status(201).json({ message: 'New user registered' }))
        .catch(error => {
            console.log(error)
            res.status(400)
        })
    })
    .catch(error => {
        console.log(error)
        res.status(500)
    })
}

router.signin = (req, res) => {
    console.log("User connection attempt")
    
    // const token = req.cookies ? req.cookies.my_cookie.token : null //  Let's check the token from cookieparser

    user.findOne({ mail: req.body.mail })
    .then(userFound => {
        if (!userFound) {
            console.log("Utilisateur non trouvé")
            return res.status(401)
        }
        
        bcrypt.compare(req.body.password, userFound.password)
        .then(valid => {
            if (!valid) {
                console.log("Connexion attempt with invalid password")
                return res.status(401).json({ error: 'Wrong password' })
            }

            const token = jwt.sign(
                {userId: userFound._id, isAdmin: userFound.role === "admin"},
                process.env.SECRET ? process.env.SECRET : "RANDOM_TOKEN_SECRET",
                {expiresIn: "12h"}
            )

            const my_cookie = {
                token,
                mail: req.body.mail,
                password: req.body.password
            }
            
            const my_cookieJson = JSON.stringify(my_cookie)

            const cookieOptions = {
                httpOnly: true, // So the client can see the cookie but js code cant access it
                maxAge: 60 * 60 * 24 * 7, // 1 week
                secure: true,
            } 
            const cookieValue = cookie.serialize('token', my_cookieJson, cookieOptions);


            res.setHeader('Set-Cookie', cookieValue);
            res.status(200).json({
                userId: userFound._id,
                token
            })
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error : 'Passwords hash comparison error'})
        })

    })
    .catch(error =>  {
        console.log(error)
        return res.status(500).json({ error : 'No user corresponding found'}) 
    })
}

module.exports = router