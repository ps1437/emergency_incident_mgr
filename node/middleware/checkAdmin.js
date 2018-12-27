const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

  const token = req.token;
  const userType = jwt.decode(token).userType;

  console.log("userType" + userType);
  if (userType != "A") 
    return res.status(403).send("Access Denied , You are not authorized !!");
  
    next();
};
