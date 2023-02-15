const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    console.log('auth')
    // console.log(req.headers.authorization)
    const token = req.headers.authorization
    if(!token) res.status(401).json({error: "No token"})
    //console.log(req.headers)
    jwt.verify(token, process.env.SECRET, function(err, decodedToken){
        if(err) {
            console.log("Authentification error: ", err)
            res.status(401).json({error: "Authentification error"})
        }
        else  {
            req.decodedToken = decodedToken // Used by isAdmin middleware
            next()
        }
    })
}