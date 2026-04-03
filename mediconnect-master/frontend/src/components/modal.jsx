import React from 'react';

const Modal = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
                {children}
                <button
                    className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
export { Modal }; // Ensure Modal is exported as a named export
