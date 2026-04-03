import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-violet-50 text-violet-600 py-10">
            <div className="container mx-auto px-4">
            <div className="flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-6">MediConnect</h2>
                <p className="text-center mb-4">Connecting you to the best healthcare services.</p>
                <div className="flex space-x-4 mb-4">
                <a href="/privacy-policy" className="text-violet-600 hover:text-violet-400">Privacy Policy</a>
                <a href="/terms-of-service" className="text-violet-600 hover:text-violet-400">Terms of Service</a>
                </div>
                <p>&copy; 2023 MediConnect. All rights reserved.</p>
            </div>
            </div>
            </footer>
        </div>
    )
}

export default Footer
