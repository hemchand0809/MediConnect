import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, User, Calendar, FileText, Home } from 'lucide-react';

const CallSummary = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [callDuration, setCallDuration] = useState('');
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    // Simulate call duration calculation
    const duration = Math.floor(Math.random() * 30) + 10; // Random 10-40 minutes
    setCallDuration(`${duration} minutes`);
    
    // You can fetch appointment data here
    setAppointmentData({
      id: appointmentId,
      patientName: 'John Doe',
      doctorName: 'Dr. Sarah Wilson',
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    });
  }, [appointmentId]);

  const goToAppointments = () => {
    navigate('/appointment');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Call Completed</h2>
          <p className="text-gray-600">Your video consultation has ended successfully</p>
        </div>

        {/* Call Summary */}
        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Call Summary
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Duration:
                </span>
                <span className="font-semibold text-gray-800">{callDuration}</span>
              </div>
              
              {appointmentData && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Patient:
                    </span>
                    <span className="font-semibold text-gray-800">{appointmentData.patientName}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Doctor:
                    </span>
                    <span className="font-semibold text-gray-800">{appointmentData.doctorName}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Date:
                    </span>
                    <span className="font-semibold text-gray-800">{appointmentData.date}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={goToAppointments}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            View All Appointments
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={goToProfile}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-semibold transition-all duration-300"
            >
              Profile
            </button>
            
            <button
              onClick={goHome}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </button>
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Call details have been saved to your appointment history. 
            You can access them anytime from your profile.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CallSummary;
