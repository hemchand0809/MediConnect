const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  updatePassword,
  uploadProfileImage
} = require('../controllers/authController');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `user-${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB max file size
  },
  fileFilter: fileFilter
});

// Protected routes (require authentication)
router.use(protect);

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', getProfile);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', updateProfile);

// @route   PUT /api/auth/password
// @desc    Update user password
// @access  Private
router.put('/password', updatePassword);

// @route   POST /api/auth/upload-profile-image
// @desc    Upload profile image
// @access  Private
router.post(
  '/upload-profile-image',
  upload.single('profileImage'),
  uploadProfileImage
);

module.exports = router;
