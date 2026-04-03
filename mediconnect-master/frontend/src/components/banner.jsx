import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();

    const handleAppointmentClick = () => {
        navigate('/appointment'); // Navigate to the appointments page
    };

    return (
        <div>
            <div className="bg-gray-100">
                <div className="container mx-auto px-6 py-32">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <div className="lg:w-1/2 text-center lg:text-left px-4 lg:px-8">
                            <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-4">
                                Your Health, <span className="text-violet-500">Our Priority</span>
                            </h1>
                            <p className="mt-6 text-lg text-gray-600 mb-6">
                                Experience world-class care and support tailored just for you.
                            </p>
                            <button
                                className="mt-8 bg-violet-500 text-white px-8 py-3 rounded-full shadow-lg hover:bg-violet-400 transition transform hover:scale-105"
                                onClick={handleAppointmentClick}
                            >
                                Book an Appointment
                            </button>
                        </div>
                        <div className="lg:w-1/2 mt-10 lg:mt-0 flex flex-wrap items-center justify-center gap-6">
                            <div className="bg-violet-100 p-8 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105">
                                <h2 className="text-2xl font-bold text-violet-600 mb-4">
                                    Trusted by Thousands
                                </h2>
                                <p className="text-gray-600">
                                    Join our community of satisfied patients who trust us for their healthcare needs.
                                </p>
                            </div>
                            <div className="bg-green-100 p-8 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105">
                                <h2 className="text-2xl font-bold text-green-600 mb-4">
                                    Expert Doctors
                                </h2>
                                <p className="text-gray-600">
                                    Our team of experienced professionals is here to provide the best care possible.
                                </p>
                            </div>
                            <div className="bg-violet-100 p-8 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105">
                                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                                    Advanced Facilities
                                </h2>
                                <p className="text-gray-600">
                                    State-of-the-art equipment and technology for accurate diagnosis and treatment.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
