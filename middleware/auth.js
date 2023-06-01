const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.token
    if (!token) {
      return res.status(401).json({ message: "No token provided." + token });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid." });
  }
};

module.exports = { authenticate };