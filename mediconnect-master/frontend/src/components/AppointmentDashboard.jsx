import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Calendar, Clock, User, CheckCircle, AlertCircle } from 'lucide-react';
import { getUserAppointments } from '../config/apiConfig';

const AppointmentDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Instead of redirecting to login, show message about needing to login
        setError('Please log in to view your appointments.');
        setLoading(false);
        return;
      }

      const response = await getUserAppointments(token);
      const appointmentsWithCallStatus = response.appointments.map(appointment => ({
        ...appointment,
        id: appointment._id, // Ensure we have an ID field
        canStartCall: appointment.status === 'confirmed' || appointment.status === 'pending',
        patientName: appointment.userDetails?.username || appointment.createdBy?.userName || 'Patient',
        doctorName: appointment.doctor?.doctorName || 'Dr. Online Consultation',
        appointmentDate: new Date(appointment.createdAt).toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        appointmentTime: new Date(appointment.createdAt).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }));
      
      setAppointments(appointmentsWithCallStatus);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(err.message || 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const startVideoCall = (appointmentId) => {
    console.log('Starting video call for appointment:', appointmentId);
    if (!appointmentId) {
      console.error('No appointment ID provided');
      setError('Invalid appointment ID. Cannot start video call.');
      return;
    }
    navigate(`/video-call/${appointmentId}`);
  };

  const startTestVideoCall = () => {
    const testId = 'test-' + Date.now();
    console.log('Starting test video call:', testId);
    navigate(`/video-call/${testId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <AlertCircle className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Appointments</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchAppointments}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent mb-4">
            My Appointments
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Manage your appointments and start video consultations
          </p>
          
          {/* Test Video Call Button for debugging */}
          <button
            onClick={startTestVideoCall}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Video className="w-5 h-5" />
            <span>Test Video Call</span>
          </button>
        </div>

        {/* Appointments Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Appointment Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{appointment.patientName}</h3>
                      <p className="text-gray-600">with {appointment.doctorName}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{appointment.appointmentDate}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{appointment.appointmentTime}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-700">
                      <strong>Health Issue:</strong> {appointment.healthIssue}
                    </p>
                    {appointment.symptoms && (
                      <p className="text-sm text-gray-600 mt-1">
                        <strong>Symptoms:</strong> {appointment.symptoms}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                      {getStatusIcon(appointment.status)}
                      <span className="capitalize">{appointment.status}</span>
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full capitalize">
                      {appointment.type}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3 lg:ml-6">
                  {appointment.canStartCall ? (
                    <button
                      onClick={() => startVideoCall(appointment.id)}
                      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Video className="w-5 h-5" />
                      <span>Start Video Call</span>
                    </button>
                  ) : (
                    <div className="text-center">
                      {appointment.status === 'completed' ? (
                        <span className="text-gray-500 text-sm">Call Completed</span>
                      ) : (
                        <span className="text-gray-500 text-sm">Call not available</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Appointments</h3>
            <p className="text-gray-500 mb-6">You don't have any appointments scheduled.</p>
            <button
              onClick={() => navigate('/appointment')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Book New Appointment
            </button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/appointment')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Book New Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDashboard;
