const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    //console.log(req.cookies, req.signedCookies)
    const token = req.headers.authorization
    if(!token) return res.status(401).json({error: "No token"})

    jwt.verify(token, process.env.SECRET, function(err, decodedToken){
        if(err) {
            console.log("Authentification error: ", err)
            return res.status(401).json({error: "Authentification error"})
        }
        else if(decodedToken) {
            req.decodedToken = decodedToken // Used by isAdmin middleware
            next()
        }
        else return res.status(401).json({error: "Authentification error"})
    })
}