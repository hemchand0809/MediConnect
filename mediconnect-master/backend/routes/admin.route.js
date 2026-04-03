const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller');
const authenticateAdmin = require('../middleware/authenticateAdmin');

// Public admin authentication routes
router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);

// Protected admin routes
router.get('/profile', authenticateAdmin, adminController.getAdminProfile);
router.get('/dashboard/stats', authenticateAdmin, adminController.getDashboardStats);

// Doctor management
router.get('/doctors', authenticateAdmin, adminController.getAllDoctors);
router.post('/doctors', authenticateAdmin, adminController.createDoctor);
router.put('/doctors/:doctorId', authenticateAdmin, adminController.updateDoctor);
router.delete('/doctors/:doctorId', authenticateAdmin, adminController.deleteDoctor);
router.post('/doctors/:doctorId/reset-password', authenticateAdmin, adminController.resetDoctorPassword);

// User management
router.get('/users', authenticateAdmin, adminController.getAllUsers);
router.put('/users/:userId', authenticateAdmin, adminController.updateUser);
router.delete('/users/:userId', authenticateAdmin, adminController.deleteUser);

// Appointment management
router.get('/appointments', authenticateAdmin, adminController.getAllAppointments);
router.put('/appointments/:appointmentId', authenticateAdmin, adminController.updateAppointment);
router.delete('/appointments/:appointmentId', authenticateAdmin, adminController.deleteAppointment);

module.exports = router;
