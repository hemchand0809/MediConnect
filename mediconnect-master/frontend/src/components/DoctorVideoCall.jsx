import React, { useEffect, useRef, useState, useCallback } from 'react';
import API_BASE_URL from '../config/apiConfig';
import { useParams, useNavigate } from 'react-router-dom';
import { Video, PhoneOff, Monitor } from 'lucide-react';

const DoctorVideoCall = () => {
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const jitsiContainer = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [appointment, setAppointment] = useState(null);
    const [callStarted, setCallStarted] = useState(false);
    const jitsiAPI = useRef(null);

    // Doctor info - in real app, this would come from authentication
    const doctorInfo = {
        name: "Dr. Sarah Johnson",
        specialization: "General Physician",
        id: "675ae123456789012345678a"
    };

    const loadJitsiScript = useCallback(() => {
        return new Promise((resolve, reject) => {
            if (window.JitsiMeetExternalAPI) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://meet.jit.si/external_api.js';
            script.async = true;
            
            script.onload = () => {
                setTimeout(() => {
                    if (window.JitsiMeetExternalAPI) {
                        resolve();
                    } else {
                        reject(new Error('Jitsi API not available'));
                    }
                }, 1000);
            };

            script.onerror = () => {
                reject(new Error('Failed to load Jitsi script'));
            };

            document.head.appendChild(script);
        });
    }, []);

    const fetchAppointment = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/appointments/${appointmentId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch appointment');
            }
            const data = await response.json();
            setAppointment(data);
            return data;
        } catch (error) {
            console.error('Error fetching appointment:', error);
            throw error;
        }
    }, [appointmentId]);

    const initializeJitsi = useCallback(async (appointmentData) => {
        try {
            if (!window.JitsiMeetExternalAPI) {
                throw new Error('Jitsi API not available');
            }

            let attempts = 0;
            while (!jitsiContainer.current && attempts < 20) {
                console.log('Waiting for container...', attempts);
                await new Promise(resolve => setTimeout(resolve, 200));
                attempts++;
            }

            if (!jitsiContainer.current) {
                throw new Error('Container not found after waiting');
            }

            console.log('Container found, initializing Jitsi...');

            const roomName = `mediconnect-${appointmentId}`;
            const options = {
                roomName: roomName,
                width: '100%',
                height: 600,
                parentNode: jitsiContainer.current,
                configOverwrite: {
                    startWithAudioMuted: false,
                    startWithVideoMuted: false,
                    enableWelcomePage: false,
                    prejoinPageEnabled: false,
                    toolbarButtons: [
                        'microphone', 'camera', 'closedcaptions', 'desktop',
                        'fullscreen', 'fodeviceselection', 'hangup', 'profile',
                        'chat', 'recording', 'settings', 'raisehand', 'videoquality',
                        'filmstrip', 'stats', 'shortcuts', 'tileview', 'download', 'help'
                    ]
                },
                interfaceConfigOverwrite: {
                    DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
                    SHOW_JITSI_WATERMARK: false,
                    SHOW_WATERMARK_FOR_GUESTS: false,
                    TOOLBAR_ALWAYS_VISIBLE: true
                },
                userInfo: {
                    displayName: `Dr. ${doctorInfo.name} (Doctor)`,
                    email: 'doctor@mediconnect.com'
                }
            };

            console.log('Creating Jitsi API with options:', options);
            const api = new window.JitsiMeetExternalAPI('meet.jit.si', options);
            
            api.addEventListener('readyToClose', () => {
                navigate('/doctor/dashboard');
            });

            api.addEventListener('videoConferenceJoined', () => {
                console.log('Doctor successfully joined video conference');
                setCallStarted(true);
            });

            api.addEventListener('participantJoined', (participant) => {
                console.log('Participant joined:', participant);
            });

            api.addEventListener('participantLeft', (participant) => {
                console.log('Participant left:', participant);
            });

            jitsiAPI.current = api;
            console.log('Jitsi API initialized successfully for doctor');
            
        } catch (error) {
            console.error('Error initializing Jitsi:', error);
            throw error;
        }
    }, [appointmentId, navigate, doctorInfo.name]);

    const startCall = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            console.log('Doctor starting video call for appointment:', appointmentId);

            // Add a small delay to ensure component is fully mounted
            await new Promise(resolve => setTimeout(resolve, 1000));

            const appointmentData = await fetchAppointment();
            console.log('Appointment data fetched:', appointmentData);
            
            await loadJitsiScript();
            console.log('Jitsi script loaded');
            
            await initializeJitsi(appointmentData);
            console.log('Jitsi initialized for doctor');

            setIsLoading(false);

        } catch (error) {
            console.error('Failed to start doctor video call:', error);
            setIsLoading(false);
            setError(error.message);
        }
    }, [appointmentId, fetchAppointment, loadJitsiScript, initializeJitsi]);

    useEffect(() => {
        if (appointmentId) {
            const timer = setTimeout(() => {
                startCall();
            }, 100);

            return () => {
                clearTimeout(timer);
                if (jitsiAPI.current) {
                    try {
                        jitsiAPI.current.dispose();
                    } catch (error) {
                        console.error('Error disposing Jitsi:', error);
                    }
                }
            };
        }
    }, [appointmentId, startCall]);

    const handleRetry = () => {
        startCall();
    };

    const handleEndCall = () => {
        if (jitsiAPI.current) {
            jitsiAPI.current.dispose();
        }
        navigate('/doctor/dashboard');
    };

    const openJitsiInNewTab = () => {
        const roomName = `mediconnect-${appointmentId}`;
        const jitsiUrl = `https://meet.jit.si/${roomName}`;
        window.open(jitsiUrl, '_blank');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Starting Doctor Video Call...
                    </h2>
                    <p className="text-gray-600">
                        Preparing consultation room for Dr. {doctorInfo.name}
                    </p>
                    {appointment && (
                        <p className="text-sm text-gray-500 mt-2">
                            Patient: {appointment.patientName}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
                    <div className="text-center">
                        <div className="text-red-500 text-5xl mb-4">⚠️</div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Doctor Video Call Error
                        </h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        
                        <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
                            <h3 className="font-semibold text-blue-800 mb-2">🩺 Doctor Instructions:</h3>
                            <p className="text-sm text-blue-700 mb-3">
                                As the attending physician, you can join the consultation room to meet with your patient.
                            </p>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• The patient should join the same room: <code className="bg-blue-100 px-1 rounded">mediconnect-{appointmentId}</code></li>
                                <li>• Use professional video call etiquette</li>
                                <li>• Ensure good lighting and clear audio</li>
                                <li>• Have patient records ready for reference</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={handleRetry}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={openJitsiInNewTab}
                                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                            >
                                Open in New Tab (Backup)
                            </button>
                            <button
                                onClick={() => navigate('/doctor/dashboard')}
                                className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-6">
                <div className="bg-white rounded-lg shadow-md">
                    {/* Doctor Header */}
                    <div className="p-4 border-b border-gray-200 bg-blue-50">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-xl font-semibold text-gray-800">
                                    Doctor Consultation Room
                                </h1>
                                <div className="flex items-center space-x-4 mt-1">
                                    <span className="text-sm text-blue-700 font-medium">
                                        Dr. {doctorInfo.name} - {doctorInfo.specialization}
                                    </span>
                                    {appointment && (
                                        <span className="text-sm text-gray-600">
                                            Patient: {appointment.patientName}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={openJitsiInNewTab}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm flex items-center"
                                >
                                    <Monitor className="w-4 h-4 mr-2" />
                                    Open in New Tab
                                </button>
                                <button
                                    onClick={handleEndCall}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center"
                                >
                                    <PhoneOff className="w-4 h-4 mr-2" />
                                    End Consultation
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Patient Info Banner */}
                    {appointment && (
                        <div className="bg-green-50 border-l-4 border-green-400 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="text-green-400">👨‍⚕️</div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-green-700">
                                        <strong>Patient Information:</strong> {appointment.patientName} ({appointment.patientEmail}) | 
                                        <strong> Health Issue:</strong> {appointment.healthIssue} | 
                                        <strong> Appointment:</strong> {appointment.time} on {new Date(appointment.date).toLocaleDateString()}
                                        {appointment.symptoms && (
                                            <span> | <strong>Symptoms:</strong> {appointment.symptoms}</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Video Call Interface */}
                    <div className="p-4">
                        <div 
                            ref={jitsiContainer}
                            className="w-full bg-gray-900 rounded-lg"
                            style={{ minHeight: '600px' }}
                        />
                    </div>

                    {/* Call Status */}
                    {callStarted && (
                        <div className="p-4 bg-green-50 border-t">
                            <div className="flex items-center justify-center text-green-700">
                                <Video className="w-5 h-5 mr-2" />
                                <span className="font-medium">Consultation in Progress</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorVideoCall;