const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin',
        enum: ['admin', 'superadmin']
    },
    fullName: {
        type: String,
        trim: true,
        default: ''
    },
    phone: {
        type: String,
        trim: true,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
    },
    permissions: {
        canManageDoctors: { type: Boolean, default: true },
        canManageUsers: { type: Boolean, default: true },
        canManageAppointments: { type: Boolean, default: true },
        canViewQueries: { type: Boolean, default: true },
        canManagePayments: { type: Boolean, default: true },
        canViewAnalytics: { type: Boolean, default: true }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp before saving
adminSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
