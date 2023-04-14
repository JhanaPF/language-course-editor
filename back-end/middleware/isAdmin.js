module.exports = (req, res, next) => {
    if (req.decodedToken.isAdmin){ // isAdmin variable set in auth middleware from jwt token
        next()
    }
    else res.status(401)
}