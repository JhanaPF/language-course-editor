const jwt = require('jsonwebtoken')
require('dotenv').config()
const cookie = require('cookie')

/**
 * @description All routes with isAdmin middleware need isAuth s logic
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns next() with req.decodedToken
 */
module.exports = (req, res, next) => {
    //console.log("cookies:", req.signedCookies)
    const myCookie = req.signedCookies.credentials
    if (!myCookie) return res.status(401).json()

    let token
    try {
        const parsedCookie = cookie.parse(myCookie)
        token = parsedCookie.token
        token = token.substring(1, token.length - 1)
    } catch (err) {
        console.error(`IsAuth. Parsing error : ${err}`)
        return res.status(401).json()
    }

    if (!token) return res.status(401).json({ error: "No token" })

    const secretKey = process.env.SECRET
    jwt.verify(token, secretKey ? secretKey : "RANDOM_TOKEN_SECRET", function (err, decodedToken) {
        if (decodedToken) {
            const currentTimestamp = Math.floor(Date.now() / 1000) // Obtenir le timestamp actuel en secondes
            if (currentTimestamp > decodedToken.exp) {
                console.log('Token is no longer valid')
                return res.status(401).send()
            } 

            req.decodedToken = decodedToken // Used by isAdmin middleware
            next()
        } else {
            if (err) console.log("Authentification error: ", err)

            return res.status(401).json({ error: "Authentification error" })
        }
    })
}