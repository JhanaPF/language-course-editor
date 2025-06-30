function debugMiddleware(req, res, next) {
  console.log("==== New Request ====");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Headers:", req.headers);
  console.log("Query:", req.query);
  console.log("Body:", req.body);
  console.log("=====================");
  
  next();
}

module.exports = debugMiddleware;
