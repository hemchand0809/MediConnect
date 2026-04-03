import AppointmentForm from "../components/AppointmentForm";
import AppointmentDashboard from "../components/AppointmentDashboard";
import { Calendar, Clock, Mail, User, Shield, Heart, Star, Phone, MapPin, Award } from "lucide-react";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from '../components/footer';

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('book'); // 'book' or 'manage'
  
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 80 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white flex flex-col">
      {/* Tab Navigation */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-lg border border-gray-200">
            <button
              onClick={() => setActiveTab('book')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'book'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Book Appointment
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'manage'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              My Appointments
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'book' ? (
        <div className="max-w-4xl mx-auto px-4 py-12 flex-1">
          <div className="text-center mb-12 animate-fade-in" data-aos="fade-down">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-6 animate-scale-in" data-aos="zoom-in">
              <Calendar className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent mb-6 animate-fade-in" data-aos="fade-up">
              Book Your Appointment
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed animate-fade-in" data-aos="fade-up" data-aos-delay="200">
              Schedule your visit with our healthcare professionals. We're here to provide 
              you with the best medical care in a comfortable environment.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-fade-in group" data-aos="flip-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300" data-aos="zoom-in">
                <User className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Personal Care</h3>
              <p className="text-gray-600">Tailored treatment plans for your unique needs</p>
            </div>
            <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-fade-in group" data-aos="flip-up" data-aos-delay="100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300" data-aos="zoom-in">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Flexible Hours</h3>
              <p className="text-gray-600">Convenient scheduling to fit your busy lifestyle</p>
            </div>
            <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-fade-in group" data-aos="flip-right" data-aos-delay="200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300" data-aos="zoom-in">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Easy Communication</h3>
              <p className="text-gray-600">Stay connected with instant confirmations</p>
            </div>
          </div>

          {/* Appointment Form */}
          <div data-aos="fade-up">
            <AppointmentForm />
          </div>
        </div>
      ) : (
        <AppointmentDashboard />
      )}
      
      <Footer />
    </div>
  );
};

export default Appointments;