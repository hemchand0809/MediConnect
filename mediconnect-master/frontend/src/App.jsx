import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Nav from './components/nav';
import Signup from './screens/signup';
import Login from './screens/login';
import Home from './screens/home';
import About from './screens/about';
import Appointment from './screens/appointment';
import Profile from './screens/profile';
import Medicines from './screens/medicines';
import LabTest from './screens/lab-test';
import Cart from './screens/cart';
import VideoCall from './components/VideoCall';
import DoctorPortal from './components/DoctorPortal';
import DoctorLogin from './components/DoctorLogin';
import DoctorDashboard from './components/DoctorDashboard';
import DoctorVideoCall from './components/DoctorVideoCall';
import CallSummary from './components/CallSummary';
import ErrorBoundary from './components/ErrorBoundary';
import { CartProvider, useCart } from './components/CartContext';
import DoctorAddPrescription from './components/DoctorAddPrescription';
import Prescription from './components/Prescription';
import MedicalRecords from './components/MedicalRecords';
import PHCPanel from './components/PHCPanel';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminDoctorManagement from './components/AdminDoctorManagement';
import AdminUserManagement from './components/AdminUserManagement';
import AdminQueries from './components/AdminQueries';
import AdminRegister from './components/AdminRegister';
import AdminAppointments from './components/AdminAppointments';

function AppRoutes() {
  const { addToCart } = useCart();
  const location = useLocation();
  
  // Hide navigation for video call pages, doctor dashboard, and admin pages
  const hideNav = ['/cart'].includes(location.pathname) || 
                  location.pathname.includes('/video-call') || 
                  location.pathname.includes('/call-summary') ||
                  location.pathname.includes('/doctor/dashboard') ||
                  location.pathname.includes('/admin');
  
  return (
    <>
      {!hideNav && <Nav />}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/appointment" element={<Appointment/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/medicines" element={<Medicines onAddToCart={addToCart} />} />
        <Route path="/lab-test" element={<LabTest />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/prescription" element={<Prescription />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
        <Route path="/video-call/:appointmentId" element={
          <ErrorBoundary>
            <VideoCall />
          </ErrorBoundary>
        } />
        <Route path="/doctor" element={<DoctorPortal />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/video-call/:appointmentId" element={
          <ErrorBoundary>
            <DoctorVideoCall />
          </ErrorBoundary>
        } />
        <Route path="/doctor/prescription/new" element={
          <ErrorBoundary>
            <DoctorAddPrescription />
          </ErrorBoundary>
        } />
        <Route path="/doctor/phc" element={<PHCPanel />} />
        <Route path="/appointment/:appointmentId/summary" element={<CallSummary />} />
        
        {/* Admin Routes */}
  <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/doctors" element={<AdminDoctorManagement />} />
        <Route path="/admin/users" element={<AdminUserManagement />} />
  <Route path="/admin/appointments" element={<AdminAppointments />} />
        <Route path="/admin/queries" element={<AdminQueries />} />
        
        <Route path="*" element={<h1 className="text-2xl text-center mb-8 mt-5">404 Not Found</h1>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}

export default App;
