import React, { useState } from 'react';
import { Star, Quote, Heart } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    review: "MediConnect has transformed my healthcare experience. The medicine delivery is fast, reliable, and the quality is exceptional. I love how easy it is to order my prescriptions!",
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    fallbackColor: 'bg-gradient-to-br from-pink-300 to-purple-400',
    initials: 'SJ',
    rating: 5,
    location: 'New York, NY'
  },
  {
    name: 'Michael Chen',
    review: "Outstanding service! The doctors are professional and the appointment booking system is seamless. I've been using MediConnect for 6 months and couldn't be happier.",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    fallbackColor: 'bg-gradient-to-br from-blue-300 to-indigo-400',
    initials: 'MC',
    rating: 5,
    location: 'San Francisco, CA'
  },
  {
    name: 'Emily Rodriguez',
    review: "The lab test results came back quickly and the staff was incredibly helpful. MediConnect makes healthcare accessible and convenient. Highly recommended!",
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    fallbackColor: 'bg-gradient-to-br from-green-300 to-teal-400',
    initials: 'ER',
    rating: 5,
    location: 'Miami, FL'
  },
  {
    name: 'David Thompson',
    review: "Best healthcare platform I've used! The medicine prices are competitive and the delivery is always on time. The customer support team is amazing too.",
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    fallbackColor: 'bg-gradient-to-br from-orange-300 to-red-400',
    initials: 'DT',
    rating: 5,
    location: 'Chicago, IL'
  }
];

const Testimonials = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-down">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Patients</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from real people who trust MediConnect with their healthcare needs
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white/70 backdrop-blur-sm rounded-3xl border border-purple-100 p-8 transition-all duration-700 ease-out hover:shadow-2xl hover:shadow-purple-200/50 hover:-translate-y-3 hover:scale-[1.02] animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <Quote className="w-8 h-8 text-purple-600" />
              </div>

              {/* Rating Stars */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 fill-yellow-400 text-yellow-400 transition-transform duration-300 group-hover:scale-110" 
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 relative z-10">
                "{testimonial.review}"
              </blockquote>

              {/* User Info */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border-3 border-purple-200 transition-all duration-500 group-hover:scale-110 group-hover:border-purple-400 overflow-hidden">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div 
                      className={`w-full h-full ${testimonial.fallbackColor} flex items-center justify-center text-white font-bold text-lg hidden`}
                    >
                      {testimonial.initials}
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 group-hover:text-purple-600 transition-colors duration-300">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400/10 to-blue-400/10 blur-xl" />
              </div>

              {/* Floating Animation */}
              <div 
                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  animation: hoveredCard === index ? 'float 3s ease-in-out infinite' : 'none'
                }}
              />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="400">
          <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              10,000+
            </div>
            <div className="text-gray-600 font-medium">Happy Patients</div>
          </div>
          <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              4.9/5
            </div>
            <div className="text-gray-600 font-medium">Average Rating</div>
          </div>
          <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-gray-600 font-medium">Support Available</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="600">
          <p className="text-lg text-gray-600 mb-6">
            Join thousands of satisfied patients who trust MediConnect
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

