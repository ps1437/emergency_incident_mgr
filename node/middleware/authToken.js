const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.header("x-auth-token");

 
  if (!token)
     return res.status(401).send("Access Denied ,No Token present");

  try {
 
    jwt.verify(token, "jwtPrivateKey", function(err) {
      
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." }); // if everything good, save to request for use in other routes
      req.token = token;
      next();
    });
  } catch (ex) {
    console.log(ex);
    res.status(400).send("Invalid Token");
  }
};
