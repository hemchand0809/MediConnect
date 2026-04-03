const Admin = require('../models/admin.model');
const Doctor = require('../models/doctor.model');
const User = require('../models/user.model');
const Appointment = require('../models/appointment.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin Authentication
exports.registerAdmin = async (req, res) => {
    try {
        const { username, email, password, fullName, phone, role } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
        if (existingAdmin) {
            return res.status(400).json({ 
                success: false,
                message: 'Admin with this email or username already exists' 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const admin = new Admin({
            username,
            email,
            password: hashedPassword,
            fullName: fullName || '',
            phone: phone || '',
            role: role || 'admin'
        });

        await admin.save();

        res.status(201).json({
            success: true,
            message: 'Admin registered successfully',
            data: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        console.error('Admin registration error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error during registration', 
            error: error.message 
        });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid credentials' 
            });
        }

        // Check if admin is active
        if (!admin.isActive) {
            return res.status(403).json({ 
                success: false,
                message: 'Admin account is inactive' 
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid credentials' 
            });
        }

        // Update last login
        admin.lastLogin = Date.now();
        await admin.save();

        // Generate token
        const token = jwt.sign(
            { adminId: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
                fullName: admin.fullName,
                role: admin.role,
                permissions: admin.permissions
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error during login', 
            error: error.message 
        });
    }
};

exports.getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.adminId).select('-password');
        
        if (!admin) {
            return res.status(404).json({ 
                success: false,
                message: 'Admin not found' 
            });
        }

        res.status(200).json({
            success: true,
            data: admin
        });
    } catch (error) {
        console.error('Get admin profile error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error', 
            error: error.message 
        });
    }
};

// Doctor Management
exports.createDoctor = async (req, res) => {
    try {
        const { 
            name, email, password, specialization, phone, 
            qualifications, experience, availability, consultationFee 
        } = req.body;

        // Check if doctor exists
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ 
                success: false,
                message: 'Doctor with this email already exists' 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create doctor
        const doctor = new Doctor({
            name,
            email,
            password: hashedPassword,
            specialization,
            phone: phone || '',
            qualifications: qualifications || '',
            experience: experience || 0,
            availability: availability || [],
            consultationFee: consultationFee || 0
        });

        await doctor.save();

        res.status(201).json({
            success: true,
            message: 'Doctor created successfully',
            data: {
                id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                specialization: doctor.specialization
            }
        });
    } catch (error) {
        console.error('Create doctor error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error', 
            error: error.message 
        });
    }
};

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().select('-password').sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: doctors.length,
            doctors
        });
    } catch (error) {
        console.error('Get all doctors error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error', 
            error: error.message 
        });
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const updateData = { ...req.body };

        // If password is being updated, hash it
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const doctor = await Doctor.findByIdAndUpdate(
            doctorId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!doctor) {
            return res.status(404).json({ 
                success: false,
                message: 'Doctor not found' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Doctor updated successfully',
            data: doctor
        });
    } catch (error) {
        console.error('Update doctor error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error', 
            error: error.message 
        });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const doctor = await Doctor.findByIdAndDelete(doctorId);

        if (!doctor) {
            return res.status(404).json({ 
                success: false,
                message: 'Doctor not found' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Doctor deleted successfully'
        });
    } catch (error) {
        console.error('Delete doctor error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error', 
            error: error.message 
        });
    }
};

exports.resetDoctorPassword = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({
                success: false,
                message: 'New password is required'
            });
        }

        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        doctor.password = await bcrypt.hash(newPassword, 10);
        await doctor.save();

        res.status(200).json({
            success: true,
            message: 'Doctor password reset successfully'
        });
    } catch (error) {
        console.error('Reset doctor password error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// User Management
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error', 
            error: error.message 
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updateData = { ...req.body };

        // Don't allow password updates through this endpoint
        delete updateData.password;

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error', 
            error: error.message 
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error', 
            error: error.message 
        });
    }
};

// Dashboard Stats
exports.getDashboardStats = async (req, res) => {
    try {
        const [userCount, doctorCount, appointmentCount, todayAppointments] = await Promise.all([
            User.countDocuments(),
            Doctor.countDocuments(),
            Appointment.countDocuments(),
            Appointment.countDocuments({
                date: {
                    $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    $lt: new Date(new Date().setHours(23, 59, 59, 999))
                }
            })
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalUsers: userCount,
                totalDoctors: doctorCount,
                totalAppointments: appointmentCount,
                todayAppointments
            },
            recentActivity: []
        });
    } catch (error) {
        console.error('Get dashboard stats error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error', 
            error: error.message 
        });
    }
};

// Appointment Management
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .sort({ createdAt: -1 })
            .limit(100);
        
        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments
        });
    } catch (error) {
        console.error('Get all appointments error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error', 
            error: error.message 
        });
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const updateData = { ...req.body };

        const appointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!appointment) {
            return res.status(404).json({ 
                success: false,
                message: 'Appointment not found' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Appointment updated successfully',
            data: appointment
        });
    } catch (error) {
        console.error('Update appointment error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error', 
            error: error.message 
        });
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        const appointment = await Appointment.findByIdAndDelete(appointmentId);

        if (!appointment) {
            return res.status(404).json({ 
                success: false,
                message: 'Appointment not found' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Appointment deleted successfully'
        });
    } catch (error) {
        console.error('Delete appointment error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error', 
            error: error.message 
        });
    }
};
