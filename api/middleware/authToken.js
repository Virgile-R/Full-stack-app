const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticateToken = async (req, res, next) => {
  let message;
  //carves the token from the auth header
  const authHeader = req.getHeader("authorization").split(" ");
  const authToken = authHeader[1];
  //if authToken exists
  if (authToken) {
    //verify that it's a valid token
    jwt.verify(authToken, process.env.JWT_SECRET_KEY, function (err, user) {
      if (err) {
        message = "Wrong authentification token provided.";
      } else {
        req.currentUser = user;
      }
    });
  } else {
    message = "The authentification header was not found.";
  }
  //if message is not empty, something went wrong: return a 401 error, if not the user is logged in and goes to the requested route
  if (message) {
    console.warn(message);
    res.status(401).json({ message: "Access denied" });
  } else {
    next();
  }
};
