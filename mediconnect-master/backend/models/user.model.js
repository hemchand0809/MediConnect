const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
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
    // Personal Information
    firstName: {
        type: String,
        trim: true,
        default: ''
    },
    lastName: {
        type: String,
        trim: true,
        default: ''
    },
    phone: {
        type: String,
        trim: true,
        default: ''
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['', 'male', 'female', 'other'],
        default: ''
    },
    // Address Information
    address: {
        type: String,
        trim: true,
        default: ''
    },
    city: {
        type: String,
        trim: true,
        default: ''
    },
    state: {
        type: String,
        trim: true,
        default: ''
    },
    zipCode: {
        type: String,
        trim: true,
        default: ''
    },
    // Emergency Contact
    emergencyContact: {
        type: String,
        trim: true,
        default: ''
    },
    emergencyPhone: {
        type: String,
        trim: true,
        default: ''
    },
    // Medical Information
    bloodType: {
        type: String,
        enum: ['', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        default: ''
    },
    allergies: {
        type: String,
        default: ''
    },
    medications: {
        type: String,
        default: ''
    },
    medicalHistory: {
        type: String,
        default: ''
    },
    // Profile Image
    profileImage: {
        type: String,
        default: ''
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

// Update the updatedAt timestamp before saving
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;