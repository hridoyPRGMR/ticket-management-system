const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  // Check if token exists and starts with 'Bearer'
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {

    token = token.split(" ")[1]; // extract the token after 'Bearer'
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    const user = await User.findById(decoded.userId).select("-password"); 

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } 
  catch (err) {
    return res.status(401).json({success:false,message: "Not authorized, token failed"});
  }
};

const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized as admin" });
  }
  next();
};

module.exports = { protect, adminOnly };
