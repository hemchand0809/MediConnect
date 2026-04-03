import React from 'react';

const ExpandedService = ({ service, onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90 flex justify-center items-center z-50 transition-all duration-500 ease-in-out">
            <div className="bg-gray-100 w-11/12 md:w-[80vw] h-[80vh] rounded-lg shadow-2xl p-8 overflow-y-auto relative transform transition-transform duration-500 ease-in-out scale-100 hover:scale-105">
                <button
                    className="absolute top-4 right-4 bg-gray-700 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-600 transition-all duration-300"
                    onClick={onClose}
                >
                    Close
                </button>
                <h2 className="text-3xl md:text-4xl font-extrabold text-violet-600 text-center mb-6">
                    {service.title}
                </h2>
                <p className="text-center text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                    {service.details}
                </p>
                <div className="text-center">
                    <p className="text-gray-600 text-base md:text-lg">
                        Explore more about our <span className="font-semibold text-violet-500">{service.title}</span> services to ensure the best care for you and your family.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ExpandedService;