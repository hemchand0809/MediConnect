const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  try {
    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      if (!token) {
        return res.status(401).json({ 
          success: false,
          message: 'Not authorized, no token provided' 
        });
      }

      try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        
        // Get user from the token
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
          return res.status(401).json({
            success: false,
            message: 'User not found'
          });
        }

        // Attach user to request object
        req.user = user;
        req.user._id = user._id; // Ensure _id is properly set
        
        next();
      } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({
          success: false,
          message: 'Not authorized, token verification failed',
          error: error.message
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided'
      });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication',
      error: error.message
    });
  }
};

// Middleware to check if user is admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

// Middleware to check if user is a doctor
const doctor = (req, res, next) => {
  if (req.user && req.user.isDoctor) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as a doctor' });
  }
};

module.exports = { protect, admin, doctor };
