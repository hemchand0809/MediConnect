import React, { useEffect, useRef, useState, useCallback } from 'react';
import API_BASE_URL from '../config/apiConfig';
import { useParams, useNavigate } from 'react-router-dom';

const VideoCall = () => {
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const jitsiContainer = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [appointment, setAppointment] = useState(null);
    const jitsiAPI = useRef(null);

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

            // Wait for container to be available
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
                    prejoinPageEnabled: false
                },
                userInfo: {
                    displayName: appointmentData?.patientName || 'Patient'
                }
            };

            console.log('Creating Jitsi API with options:', options);
            const api = new window.JitsiMeetExternalAPI('meet.jit.si', options);
            
            api.addEventListener('readyToClose', () => {
                navigate('/appointments');
            });

            api.addEventListener('videoConferenceJoined', () => {
                console.log('Successfully joined video conference');
            });

            jitsiAPI.current = api;
            console.log('Jitsi API initialized successfully');
            
        } catch (error) {
            console.error('Error initializing Jitsi:', error);
            throw error;
        }
    }, [appointmentId, navigate]);

    const startCall = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            console.log('Starting video call for appointment:', appointmentId);

            // Add a small delay to ensure component is fully mounted
            await new Promise(resolve => setTimeout(resolve, 1000));

            const appointmentData = await fetchAppointment();
            console.log('Appointment data fetched:', appointmentData);
            
            await loadJitsiScript();
            console.log('Jitsi script loaded');
            
            await initializeJitsi(appointmentData);
            console.log('Jitsi initialized');

            setIsLoading(false);

        } catch (error) {
            console.error('Failed to start video call:', error);
            setIsLoading(false);
            setError(error.message);
        }
    }, [appointmentId, fetchAppointment, loadJitsiScript, initializeJitsi]);

    useEffect(() => {
        if (appointmentId) {
            // Add a small delay to ensure DOM is ready
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

    const handleGoBack = () => {
        navigate('/appointments');
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
                        Starting Video Call...
                    </h2>
                    <p className="text-gray-600">
                        Please wait while we initialize your video call
                    </p>
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
                            Video Call Error
                        </h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        
                        {/* Demo Helper Section */}
                        <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
                            <h3 className="font-semibold text-blue-800 mb-2">💡 Demo Note:</h3>
                            <p className="text-sm text-blue-700 mb-3">
                                In a real scenario, both patient and doctor would join the same video call room. 
                                For demonstration purposes, you can:
                            </p>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Open the video call in a new tab to simulate the doctor joining</li>
                                <li>• The room name is: <code className="bg-blue-100 px-1 rounded">mediconnect-{appointmentId}</code></li>
                                <li>• Both participants would see and hear each other in a real appointment</li>
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
                                Open in New Tab (Demo)
                            </button>
                            <button
                                onClick={handleGoBack}
                                className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                            >
                                Back to Appointments
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
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-xl font-semibold text-gray-800">
                                    Video Consultation
                                </h1>
                                {appointment && (
                                    <p className="text-sm text-gray-600">
                                        with Dr. {appointment.doctorName}
                                    </p>
                                )}
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={openJitsiInNewTab}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
                                >
                                    Open in New Tab
                                </button>
                                <button
                                    onClick={handleGoBack}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                >
                                    End Call
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Demo Info Banner */}
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <div className="text-blue-400">ℹ️</div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-blue-700">
                                    <strong>Demo Mode:</strong> In a real appointment, the doctor would join this same room. 
                                    You can open this call in a new tab to simulate both participants joining the video consultation.
                                    Room ID: <code className="bg-blue-100 px-1 rounded">mediconnect-{appointmentId}</code>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4">
                        <div 
                            ref={jitsiContainer}
                            className="w-full bg-gray-900 rounded-lg"
                            style={{ minHeight: '600px' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCall;
