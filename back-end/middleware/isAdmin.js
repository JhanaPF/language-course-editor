// Midlleware à placer en intermédiaires dans les routes pour sécuriser leurs accès en tant qu'admin

module.exports = (req, res, next) => {

    // `req.user.isAdmin` est obtenu depuis le middleware précedent "auth", 
    // la variable est décodée depuis le jeton JWT
    console.log('is admin', req.decodedToken)
    if (req.decodedToken.isAdmin){
        next()
    }
    else res.status(401)
}