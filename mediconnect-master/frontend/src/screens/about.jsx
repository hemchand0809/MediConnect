import { Link } from "react-router-dom";
import { 
  Stethoscope, 
  Pill, 
  Microscope, 
  Users, 
  Award, 
  Clock, 
  Shield, 
  Heart,
  CheckCircle,
  Globe,
  Star
} from "lucide-react";
import Footer from "../components/footer.jsx";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 80 });
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Fade-in animation for the whole page */}
      <div className="animate-fade-in">
        {/* Hero Section */}
        <section className="py-20" data-aos="fade-down">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold" data-aos="zoom-in">About MediConnect</span>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6" data-aos="fade-up">
                Revolutionizing
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient-x"> Healthcare Access</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                We're on a mission to make quality healthcare accessible, affordable, and convenient for everyone, 
                bridging the gap between patients and healthcare providers through innovative technology.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  To democratize healthcare by providing seamless access to medical consultations, 
                  prescription medicines, and diagnostic services through our comprehensive digital platform.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start" data-aos="fade-left" data-aos-delay="100">
                    <CheckCircle className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0 animate-bounce" />
                    <p className="text-gray-700">24/7 access to certified healthcare professionals</p>
                  </div>
                  <div className="flex items-start" data-aos="fade-left" data-aos-delay="200">
                    <CheckCircle className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0 animate-bounce" />
                    <p className="text-gray-700">Secure and confidential medical consultations</p>
                  </div>
                  <div className="flex items-start" data-aos="fade-left" data-aos-delay="300">
                    <CheckCircle className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0 animate-bounce" />
                    <p className="text-gray-700">Fast and reliable medicine delivery nationwide</p>
                  </div>
                </div>
              </div>
              <div className="relative" data-aos="zoom-in-up" data-aos-delay="200">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white shadow-2xl transform transition-transform duration-700 hover:scale-105 hover:shadow-3xl animate-pulse">
                  <Heart className="h-12 w-12 mb-4 animate-spin-slow" />
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-blue-50 leading-relaxed">
                    To become the most trusted healthcare companion, empowering millions to take control 
                    of their health journey with confidence and convenience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Deep Dive */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4" data-aos="fade-up">Comprehensive Healthcare Solutions</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="150">
                From consultation to recovery, we provide end-to-end healthcare services tailored to your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl group cursor-pointer" data-aos="fade-up" data-aos-delay="100">
                <div className="p-8">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 animate-float">
                    <Stethoscope className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Online Consultations</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Connect with board-certified doctors through secure video calls, chat, or phone consultations. 
                    Get expert medical advice from the comfort of your home.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center" data-aos="fade-right" data-aos-delay="200">
                      <Star className="h-4 w-4 text-purple-500 mr-2 animate-pulse" />
                      500+ Certified Doctors
                    </li>
                    <li className="flex items-center" data-aos="fade-right" data-aos-delay="250">
                      <Clock className="h-4 w-4 text-blue-500 mr-2 animate-spin-slow" />
                      Available 24/7
                    </li>
                    <li className="flex items-center" data-aos="fade-right" data-aos-delay="300">
                      <Shield className="h-4 w-4 text-blue-500 mr-2 animate-bounce" />
                      HIPAA Compliant
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl group cursor-pointer" data-aos="fade-up" data-aos-delay="200">
                <div className="p-8">
                  <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 animate-float">
                    <Pill className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Medicine Delivery</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Order prescribed medicines and over-the-counter drugs with guaranteed authenticity. 
                    Fast, secure delivery to your doorstep with real-time tracking.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center" data-aos="fade-right" data-aos-delay="200">
                      <Globe className="h-4 w-4 text-blue-500 mr-2 animate-pulse" />
                      Pan-India Delivery
                    </li>
                    <li className="flex items-center" data-aos="fade-right" data-aos-delay="250">
                      <Clock className="h-4 w-4 text-purple-500 mr-2 animate-spin-slow" />
                      Same Day Delivery
                    </li>
                    <li className="flex items-center" data-aos="fade-right" data-aos-delay="300">
                      <Shield className="h-4 w-4 text-blue-500 mr-2 animate-bounce" />
                      Authentic Medicines
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 bg-gradient-to-br from-blue-50 to-purple-100 rounded-2xl group cursor-pointer" data-aos="fade-up" data-aos-delay="300">
                <div className="p-8">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 animate-float">
                    <Microscope className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Lab Tests</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Book diagnostic tests with home sample collection. Get accurate results with digital reports 
                    delivered directly to your account within 24-48 hours.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center" data-aos="fade-right" data-aos-delay="200">
                      <Users className="h-4 w-4 text-blue-500 mr-2 animate-pulse" />
                      Home Collection
                    </li>
                    <li className="flex items-center" data-aos="fade-right" data-aos-delay="250">
                      <Award className="h-4 w-4 text-purple-500 mr-2 animate-spin-slow" />
                      NABL Certified Labs
                    </li>
                    <li className="flex items-center" data-aos="fade-right" data-aos-delay="300">
                      <Clock className="h-4 w-4 text-blue-500 mr-2 animate-bounce" />
                      24-48 Hour Results
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600" data-aos="fade-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Trusted by Thousands</h2>
              <p className="text-blue-100 text-lg">Making healthcare accessible across the nation</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center" data-aos="zoom-in" data-aos-delay="100">
                <div className="text-4xl font-bold text-white mb-2">50K+</div>
                <div className="text-blue-100">Happy Patients</div>
              </div>
              <div className="text-center" data-aos="zoom-in" data-aos-delay="200">
                <div className="text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-blue-100">Certified Doctors</div>
              </div>
              <div className="text-center" data-aos="zoom-in" data-aos-delay="300">
                <div className="text-4xl font-bold text-white mb-2">100K+</div>
                <div className="text-blue-100">Medicines Delivered</div>
              </div>
              <div className="text-center" data-aos="zoom-in" data-aos-delay="400">
                <div className="text-4xl font-bold text-white mb-2">25K+</div>
                <div className="text-blue-100">Lab Tests Completed</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20" data-aos="fade-up">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Experience Better Healthcare?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of satisfied patients who trust MediConnect for their healthcare needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 animate-float">
                Start Your Journey
              </button>
              <Link to="/">
                <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-50 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 animate-float">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

// Tailwind config: add custom animations for fade-in, float, spin-slow, and gradient-x
// theme: { extend: { keyframes: { 'fade-in': { '0%': { opacity: 0 }, '100%': { opacity: 1 } }, float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } }, 'spin-slow': { '100%': { transform: 'rotate(360deg)' } }, 'gradient-x': { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } } }, animation: { 'fade-in': 'fade-in 1.2s ease-out', float: 'float 3s ease-in-out infinite', 'spin-slow': 'spin 3s linear infinite', 'gradient-x': 'gradient-x 5s ease-in-out infinite' } } }

export default About;