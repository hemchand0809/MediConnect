const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');

const authenticateAdmin = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'Access denied. No token provided.' 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find admin by ID
        const admin = await Admin.findById(decoded.adminId);
        
        if (!admin) {
            return res.status(401).json({ 
                success: false,
                message: 'Admin not found.' 
            });
        }

        if (!admin.isActive) {
            return res.status(403).json({ 
                success: false,
                message: 'Admin account is inactive.' 
            });
        }

        // Attach admin to request
        req.admin = {
            adminId: admin._id,
            username: admin.username,
            email: admin.email,
            role: admin.role,
            permissions: admin.permissions
        };

        next();
    } catch (error) {
        console.error('Admin authentication error:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid token.' 
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false,
                message: 'Token expired.' 
            });
        }

        res.status(500).json({ 
            success: false,
            message: 'Server error during authentication.' 
        });
    }
};

module.exports = authenticateAdmin;
