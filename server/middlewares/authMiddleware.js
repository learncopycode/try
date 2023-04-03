// authMiddleware.js

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');

function authMiddleware(req, res, next) {
  // Get token from header
  const token = req.header('Authorization').replace('Bearer ', '');

  // Verify token
  try {
    const decoded = jwt.verify(token, jwtSecret);

    // Add user to request object
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
}

module.exports = authMiddleware;
