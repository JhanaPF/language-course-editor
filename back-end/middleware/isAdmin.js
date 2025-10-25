module.exports = (req, res, next) => {
	if(process.env.NODE_ENV === 'development'){
		return next();
	}

	if(!req.decodedToken) return res.status(401).send();
    
	const role = req.decodedToken.role; // variable used in isAuth middleware
	if(!role){ 
		console.log('No decoded token');
		return res.status(401).send();
	}

	if (role === 'admin' || role === 'superAdmin') next();
	else return res.status(403).send();
};