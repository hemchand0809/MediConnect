import React from 'react'

const doctors = () => {
  return (
    <div className="bg-gradient-to-br from-violet-50 via-blue-50 to-white py-16 px-2 min-h-[60vh]">
      <div className="max-w-5xl mx-auto">
        <div className="text-violet-700 py-2 flex justify-center items-center">
          <div className="text-center w-full">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">Our Doctors</h1>
            <div className="text-center text-lg text-gray-600 mb-8">Meet our team of experienced doctors</div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Doctor 1 */}
          <div className="group bg-white/90 shadow-xl rounded-3xl overflow-hidden flex flex-col items-center transition-all duration-500 border-2 border-violet-100 hover:border-violet-400 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 cursor-pointer">
            <div className="w-40 h-40 mt-6 mb-4 rounded-full overflow-hidden border-4 border-violet-200 group-hover:border-violet-400 shadow-md transition-all duration-500">
              <img
                src="doc3.jpg"
                alt="Doctor 1"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="px-6 pb-8 text-center w-full">
              <h2 className="text-2xl font-bold text-violet-700 mb-1 group-hover:text-violet-900 transition-colors duration-300">Dr. John Doe</h2>
              <p className="text-gray-500 text-lg">Cardiologist</p>
            </div>
          </div>
          {/* Doctor 2 */}
          <div className="group bg-white/90 shadow-xl rounded-3xl overflow-hidden flex flex-col items-center transition-all duration-500 border-2 border-violet-100 hover:border-violet-400 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 cursor-pointer">
            <div className="w-40 h-40 mt-6 mb-4 rounded-full overflow-hidden border-4 border-violet-200 group-hover:border-violet-400 shadow-md transition-all duration-500">
              <img
                src="doc2.jpg"
                alt="Doctor 2"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="px-6 pb-8 text-center w-full">
              <h2 className="text-2xl font-bold text-violet-700 mb-1 group-hover:text-violet-900 transition-colors duration-300">Dr. Jane Smith</h2>
              <p className="text-gray-500 text-lg">Neurologist</p>
            </div>
          </div>
          {/* Doctor 3 */}
          <div className="group bg-white/90 shadow-xl rounded-3xl overflow-hidden flex flex-col items-center transition-all duration-500 border-2 border-violet-100 hover:border-violet-400 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 cursor-pointer">
            <div className="w-40 h-40 mt-6 mb-4 rounded-full overflow-hidden border-4 border-violet-200 group-hover:border-violet-400 shadow-md transition-all duration-500">
              <img
                src="doc1.jpg"
                alt="Doctor 3"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="px-6 pb-8 text-center w-full">
              <h2 className="text-2xl font-bold text-violet-700 mb-1 group-hover:text-violet-900 transition-colors duration-300">Dr. Emily Brown</h2>
              <p className="text-gray-500 text-lg">Pediatrician</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default doctors
