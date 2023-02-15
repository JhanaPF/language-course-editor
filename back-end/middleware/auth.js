const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    try{
        // console.log(req.headers.authorization)
        console.log(req)
        if(!req.body.userId) throw 'no user id'
        const token = req.headers.authorization
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if(!decodedToken.userId) throw 'Invalid token'
        const tokenUserId = decodedToken.userId
        req.decodedToken = decodedToken // Used by isAdmin middleware
        console.log(req.body.userId, tokenUserId)
        if(req.body.userId === tokenUserId) { // Is encoded id in token the same as given user id
            next()
        } 
        else throw 'Invalid id'
    }
    catch (error) {
        console.log("Authentification error: ", error)
        res.status(401).json({error: "Authentification error"})
    }
}