const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser= async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        // Save the user to the database
        await newUser.save();
        // Generate a JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        // Respond with the user data and token
        res.status(201).json({
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            },
            token
        }); 
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Respond with the user data and token
        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
const getUserProfile = async (req, res) => {
    const userId = req.user.userId;

    try {
        // Find the user by ID and exclude password
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Respond with complete user profile data
        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || '',
                dateOfBirth: user.dateOfBirth || '',
                gender: user.gender || '',
                address: user.address || '',
                city: user.city || '',
                state: user.state || '',
                zipCode: user.zipCode || '',
                emergencyContact: user.emergencyContact || '',
                emergencyPhone: user.emergencyPhone || '',
                bloodType: user.bloodType || '',
                allergies: user.allergies || '',
                medications: user.medications || '',
                medicalHistory: user.medicalHistory || '',
                profileImage: user.profileImage || '',
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
const handleDeleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        // Find the user by ID and delete
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Respond with success message
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
const updateUserProfile = async (req, res) => {
    const userId = req.user.userId;
    const {
        username,
        email,
        firstName,
        lastName,
        phone,
        dateOfBirth,
        gender,
        address,
        city,
        state,
        zipCode,
        emergencyContact,
        emergencyPhone,
        bloodType,
        allergies,
        medications,
        medicalHistory,
        profileImage
    } = req.body;

    try {
        // Build update object with only provided fields
        const updateData = {};
        
        if (username !== undefined) updateData.username = username;
        if (email !== undefined) updateData.email = email;
        if (firstName !== undefined) updateData.firstName = firstName;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (phone !== undefined) updateData.phone = phone;
        if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth;
        if (gender !== undefined) updateData.gender = gender;
        if (address !== undefined) updateData.address = address;
        if (city !== undefined) updateData.city = city;
        if (state !== undefined) updateData.state = state;
        if (zipCode !== undefined) updateData.zipCode = zipCode;
        if (emergencyContact !== undefined) updateData.emergencyContact = emergencyContact;
        if (emergencyPhone !== undefined) updateData.emergencyPhone = emergencyPhone;
        if (bloodType !== undefined) updateData.bloodType = bloodType;
        if (allergies !== undefined) updateData.allergies = allergies;
        if (medications !== undefined) updateData.medications = medications;
        if (medicalHistory !== undefined) updateData.medicalHistory = medicalHistory;
        if (profileImage !== undefined) updateData.profileImage = profileImage;
        
        // Always update the updatedAt timestamp
        updateData.updatedAt = Date.now();

        // Update user with new data
        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with updated user data
        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || '',
                dateOfBirth: user.dateOfBirth || '',
                gender: user.gender || '',
                address: user.address || '',
                city: user.city || '',
                state: user.state || '',
                zipCode: user.zipCode || '',
                emergencyContact: user.emergencyContact || '',
                emergencyPhone: user.emergencyPhone || '',
                bloodType: user.bloodType || '',
                allergies: user.allergies || '',
                medications: user.medications || '',
                medicalHistory: user.medicalHistory || '',
                profileImage: user.profileImage || '',
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        
        // Handle duplicate key errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ 
                message: `${field} already exists. Please use a different ${field}.` 
            });
        }
        
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    handleDeleteUser,
    updateUserProfile
};