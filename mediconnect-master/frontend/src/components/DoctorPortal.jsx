import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Calendar, Video, User } from 'lucide-react';

const DoctorPortal = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/doctor/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 p-8">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <Stethoscope className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Doctor Portal
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Access your medical practice dashboard
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="space-y-4">
                        <div className="text-center">
                            <h3 className="text-lg font-medium text-gray-900">Doctor Access</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Sign in to access your medical practice dashboard
                            </p>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <User className="h-8 w-8 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">Medical Professionals</h4>
                                    <p className="text-sm text-gray-500">Access patient appointments and consultations</p>
                                    <p className="text-xs text-gray-400">Secure login required</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleLoginClick}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign In to Dashboard
                        </button>

                        <div className="mt-6">
                            <div className="text-center">
                                <p className="text-xs text-gray-500 mb-3">Features available in doctor portal:</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center space-x-2 text-xs text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>View Appointments</span>
                                </div>
                                <div className="flex items-center space-x-2 text-xs text-gray-600">
                                    <Video className="h-4 w-4" />
                                    <span>Start Video Calls</span>
                                </div>
                                <div className="flex items-center space-x-2 text-xs text-gray-600">
                                    <User className="h-4 w-4" />
                                    <span>Patient Records</span>
                                </div>
                                <div className="flex items-center space-x-2 text-xs text-gray-600">
                                    <Stethoscope className="h-4 w-4" />
                                    <span>Medical Notes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="text-sm text-blue-600 hover:text-blue-500"
                    >
                        ← Back to Patient Portal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorPortal;