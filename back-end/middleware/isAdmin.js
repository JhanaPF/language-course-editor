module.exports = (req, res, next) => {
    if(!req.decodedToken) return res.status(500).send()
    
    const role = req.decodedToken.role // variable set in isAuth middleware
    if(!role){ 
        console.log("No decoded token")
        return res.status(401).send()
    }

    if (role === "admin" || role === "superAdmin") next()
    else return res.status(403).send()
}