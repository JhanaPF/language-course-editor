const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    try{
        //console.log(req.headers.authorization)
        const token = req.headers.authorization
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const tokenUserId = decodedToken.userId
        req.decodedToken = decodedToken // Used by isAdmin middleware

        if(req.body.userId && req.body.userId === tokenUserId) { next()} // Is encoded id in token the same as given user id
        else {throw 'Invalid id'}
    }
    catch (error) {
        console.log("Authentification error", error)
        res.status(401).json({error: "Authentification error"})
    }
}