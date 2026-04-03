import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config/apiConfig';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Video, Phone, CheckCircle } from 'lucide-react';

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [todayAppointments, setTodayAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activePopoverId, setActivePopoverId] = useState(null);

    // Get doctor info from localStorage (set during login)
    const [doctorInfo, setDoctorInfo] = useState(() => {
        const stored = localStorage.getItem('doctorInfo');
        return stored ? JSON.parse(stored) : {
            id: "675ae123456789012345678a",
            name: "Dr. Sarah Wilson",
            specialization: "Cardiology",
            email: "sarah.wilson@mediconnect.com"
        };
    });

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            // Fetch appointments for this specific doctor
            const response = await fetch(`${API_BASE_URL}/api/appointments/doctor/${doctorInfo.id}`);
            if (response.ok) {
                const data = await response.json();
                const allAppointments = data.appointments || [];
                setAppointments(allAppointments);
                
                // Filter appointments by today's date
                const today = new Date();
                const todayStr = today.toISOString().split('T')[0];
                
                const todayApps = allAppointments.filter(appointment => {
                    const appointmentDate = new Date(appointment.createdAt).toISOString().split('T')[0];
                    return appointmentDate === todayStr;
                });
                
                const pastApps = allAppointments.filter(appointment => {
                    const appointmentDate = new Date(appointment.createdAt).toISOString().split('T')[0];
                    return appointmentDate < todayStr;
                });
                
                setTodayAppointments(todayApps);
                setPastAppointments(pastApps);
            } else {
                console.error('Failed to fetch appointments');
                setAppointments([]);
                setTodayAppointments([]);
                setPastAppointments([]);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setAppointments([]);
            setTodayAppointments([]);
            setPastAppointments([]);
        } finally {
            setLoading(false);
        }
    };

    const startVideoCall = (appointment) => {
        navigate(`/doctor/video-call/${appointment._id}`);
    };

    const connectToPatient = (appointment) => {
        // For now, we'll show an alert with patient connection info
        // In a real app, this could initiate a chat, call, or other communication method
        const patientName = appointment.userDetails?.username || appointment.createdBy?.userName || 'Patient';
        const patientId = appointment.createdBy?.userId ? String(appointment.createdBy.userId).slice(-8) : 'N/A';
        alert(`Connecting to patient: ${patientName}\nPatient ID: ${patientId}\nHealth Issue: ${appointment.healthIssue}`);
        
        // You could also navigate to a patient communication page
        // navigate(`/doctor/patient-chat/${appointment._id}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('doctorToken');
        localStorage.removeItem('doctorInfo');
        navigate('/doctor/login');
    };

    const openAddPrescription = (appointment) => {
        const patientId = String(
            appointment.createdBy?.userId ||
            appointment.userDetails?._id ||
            appointment.userId ||
            appointment.user?._id || ''
        );
        const patientName = appointment.userDetails?.username || appointment.createdBy?.userName || 'Patient';
        navigate('/doctor/prescription/new', {
            state: {
                preselectedPatient: {
                    id: patientId,
                    name: patientName,
                },
            },
        });
    };


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
                            <p className="text-sm text-gray-600">Welcome back, {doctorInfo.name}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{doctorInfo.name}</p>
                                <p className="text-sm text-gray-500">{doctorInfo.specialization}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={handleLogout}
                                    className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    Logout
                                </button>
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Today's Appointments */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow mb-6">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-medium text-gray-900">Today's Appointments</h2>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-5 h-5 text-gray-400" />
                                        <span className="text-sm text-gray-600">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                {loading ? (
                                    <div className="text-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                        <p className="text-gray-500 mt-2">Loading appointments...</p>
                                    </div>
                                ) : todayAppointments.length === 0 ? (
                                    <div className="text-center py-8">
                                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-500">No appointments scheduled for today</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {todayAppointments.map((appointment) => (
                                            <div key={appointment._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="flex-shrink-0">
                                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                                    <User className="w-5 h-5 text-blue-600" />
                                                                </div>
                                                            </div>
                                                            <div className="relative">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setActivePopoverId(activePopoverId === appointment._id ? null : appointment._id)}
                                                                    className="text-left"
                                                                >
                                                                    <h3 className="text-sm font-medium text-gray-900 underline decoration-dotted underline-offset-2">
                                                                        {appointment.userDetails?.username || appointment.createdBy?.userName || 'Patient'}
                                                                    </h3>
                                                                </button>
                                                                <p className="text-sm text-gray-500">Patient ID: {appointment.createdBy?.userId ? String(appointment.createdBy.userId).slice(-8) : 'N/A'}</p>

                                                                {activePopoverId === appointment._id && (
                                                                    <div className="absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg">
                                                                        <div className="p-3">
                                                                            <p className="text-xs text-gray-500 mb-2">Actions for
                                                                                <span className="font-medium text-gray-700"> {appointment.userDetails?.username || appointment.createdBy?.userName || 'Patient'}</span>
                                                                            </p>
                                                                            <button
                                                                                onClick={() => openAddPrescription(appointment)}
                                                                                className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-50 text-blue-600"
                                                                            >
                                                                                Add Prescription
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="mt-3 text-sm">
                                                            <div className="flex items-center text-gray-600 mb-2">
                                                                <Clock className="w-4 h-4 mr-2" />
                                                                Appointment time: {new Date(appointment.createdAt).toLocaleTimeString('en-US', {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-600">
                                                                <strong>Health Issue:</strong> {appointment.healthIssue}
                                                            </p>
                                                            {appointment.symptoms && (
                                                                <p className="text-sm text-gray-600 mt-1">
                                                                    <strong>Symptoms:</strong> {appointment.symptoms}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex flex-col space-y-2 ml-4">
                                                        <button
                                                            onClick={() => startVideoCall(appointment)}
                                                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                                                        >
                                                            <Video className="w-4 h-4 mr-2" />
                                                            Start Video Call
                                                        </button>
                                                        <button
                                                            onClick={() => connectToPatient(appointment)}
                                                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                                                        >
                                                            <Phone className="w-4 h-4 mr-2" />
                                                            Connect to Patient
                                                        </button>
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                            appointment.status === 'confirmed' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            <CheckCircle className="w-3 h-3 mr-1" />
                                                            {appointment.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Past Appointments Section */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-medium text-gray-900">Previous Appointments</h2>
                                <p className="text-sm text-gray-500 mt-1">Past appointment records</p>
                            </div>

                            <div className="p-6">
                                {pastAppointments.length === 0 ? (
                                    <div className="text-center py-8">
                                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-500">No previous appointments</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {pastAppointments.map((appointment) => (
                                            <div key={appointment._id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="flex-shrink-0">
                                                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                                    <User className="w-5 h-5 text-gray-600" />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h3 className="text-sm font-medium text-gray-700">{appointment.userDetails?.username || appointment.createdBy?.userName || 'Patient'}</h3>
                                                                <p className="text-sm text-gray-500">Patient ID: {appointment.createdBy?.userId ? String(appointment.createdBy.userId).slice(-8) : 'N/A'}</p>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="mt-3 text-sm">
                                                            <div className="flex items-center text-gray-500 mb-2">
                                                                <Calendar className="w-4 h-4 mr-2" />
                                                                Appointment date: {new Date(appointment.createdAt).toLocaleDateString('en-US', {
                                                                    weekday: 'short',
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500">
                                                                <strong>Health Issue:</strong> {appointment.healthIssue}
                                                            </p>
                                                            {appointment.symptoms && (
                                                                <p className="text-sm text-gray-500 mt-1">
                                                                    <strong>Symptoms:</strong> {appointment.symptoms}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex flex-col space-y-2 ml-4">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
                                                            <Clock className="w-3 h-3 mr-1" />
                                                            Time Up
                                                        </span>
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                            appointment.status === 'confirmed' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            <CheckCircle className="w-3 h-3 mr-1" />
                                                            {appointment.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Quick Stats */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Today's Appointments</span>
                                    <span className="text-lg font-semibold text-blue-600">{todayAppointments.length}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Previous Appointments</span>
                                    <span className="text-lg font-semibold text-gray-600">{pastAppointments.length}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Total Appointments</span>
                                    <span className="text-lg font-semibold text-purple-600">{appointments.length}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    View Schedule
                                </button>
                                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                    <User className="w-4 h-4 mr-2" />
                                    Patient Records
                                </button>
                                <button
                                    onClick={() => navigate('/doctor/prescription/new')}
                                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Add Prescription
                                </button>
                                <button
                                    onClick={() => navigate('/doctor/phc')}
                                    className="w-full flex items-center justify-center px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors"
                                >
                                    Open PHC Panel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;