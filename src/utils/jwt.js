const jwt = require("jsonwebtoken");

const generateToken = (userId, role) => {
 
  if (!userId || !role) {
    throw new Error("User ID and role are required to generate a token.");
  }

  const secret = process.env.JWT_SECRET; 
  const expiresIn = process.env.JWT_EXPIRES_IN || "3d"; // configurable expiration

  return jwt.sign(
    { userId, role },
    secret,
    { expiresIn }
  );
};

module.exports = { generateToken };
