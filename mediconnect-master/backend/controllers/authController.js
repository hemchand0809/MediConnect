const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -__v');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  console.log('Update profile request received:', req.body);
  
  try {
    const updateFields = { ...req.body };
    
    // Remove any fields that shouldn't be updated directly
    delete updateFields.password;
    delete updateFields.isAdmin;
    delete updateFields.isDoctor;
    delete updateFields._id;
    delete updateFields.__v;

    // Handle array fields
    if (updateFields.allergies) {
      if (typeof updateFields.allergies === 'string') {
        updateFields.allergies = updateFields.allergies
          .split(',')
          .map(item => item.trim())
          .filter(item => item);
      } else if (!Array.isArray(updateFields.allergies)) {
        updateFields.allergies = [];
      }
    }
    
    if (updateFields.medications) {
      if (typeof updateFields.medications === 'string') {
        updateFields.medications = updateFields.medications
          .split(',')
          .map(item => item.trim())
          .filter(item => item);
      } else if (!Array.isArray(updateFields.medications)) {
        updateFields.medications = [];
      }
    }

    // Convert empty strings to undefined for optional fields
    Object.keys(updateFields).forEach(key => {
      if (updateFields[key] === '') {
        updateFields[key] = undefined;
      }
    });

    console.log('Processed update fields:', updateFields);

    // First, find the user
    console.log('Looking for user with ID:', req.user._id);
    const user = await User.findById(req.user._id);
    
    if (!user) {
      console.error('User not found with ID:', req.user._id);
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    console.log('Found user before update:', {
      _id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isModified: user.isModified()
    });
    
    console.log('Updating user with fields:', updateFields);
    
    // Update the user fields
    Object.keys(updateFields).forEach(key => {
      if (updateFields[key] !== undefined) {
        user.set(key, updateFields[key]);
      }
    });
    
    console.log('User document before save:', user);
    
    // Save the user with validation
    const updatedUser = await user.save({ validateBeforeSave: true });
    
    console.log('User after save:', updatedUser);
    
    // Convert to plain object and remove sensitive data
    const userObject = updatedUser.toObject({ getters: true, virtuals: false });
    delete userObject.password;
    delete userObject.__v;
    delete userObject._id;
    
    console.log('Prepared response object:', userObject);

    console.log('Profile updated successfully:', updatedUser);
    
    // Prepare the response data
    const responseData = {
      _id: userObject._id,
      username: userObject.username || '',
      email: userObject.email || '',
      firstName: userObject.firstName || '',
      lastName: userObject.lastName || '',
      phone: userObject.phone || '',
      dateOfBirth: userObject.dateOfBirth || '',
      gender: userObject.gender || '',
      address: userObject.address || '',
      city: userObject.city || '',
      state: userObject.state || '',
      zipCode: userObject.zipCode || '',
      emergencyContact: userObject.emergencyContact || '',
      emergencyPhone: userObject.emergencyPhone || '',
      bloodType: userObject.bloodType || '',
      allergies: Array.isArray(userObject.allergies) ? userObject.allergies : [],
      medications: Array.isArray(userObject.medications) ? userObject.medications : [],
      medicalHistory: userObject.medicalHistory || '',
      profileImage: userObject.profileImage || ''
    };
    
    console.log('Sending response with data:', responseData);
    
    res.status(200).json({
      success: true,
      data: responseData,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Error updating profile:', {
      error: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code,
      keyValue: error.keyValue
    });
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate field value entered',
        field: error.keyValue ? Object.keys(error.keyValue)[0] : 'unknown'
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Server error while updating profile',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Update user password
// @route   PUT /api/auth/password
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if current password is correct
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Upload profile image
// @route   POST /api/auth/upload-profile-image
// @access  Private
const uploadProfileImage = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's profile image
    user.profileImage = `/uploads/${req.file.filename}`;
    await user.save();

    res.status(200).json({
      success: true,
      data: { profileImage: user.profileImage },
      message: 'Profile image uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error uploading profile image',
      error: error.message 
    });
  }
});

module.exports = {
  getProfile,
  updateProfile,
  updatePassword,
  uploadProfileImage
};
