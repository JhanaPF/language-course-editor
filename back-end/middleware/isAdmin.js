module.exports = (req, res, next) => {
    const role = req.decodedToken.role // variable set in isAuth middleware
    if(!role){ 
        console.log("No decoded token")
        return res.status(500).json()}

    if (role === "admin" || role === "superAdmin") next()
    else res.status(401)
}