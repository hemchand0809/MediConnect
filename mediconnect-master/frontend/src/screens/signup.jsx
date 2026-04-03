import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Heart, User } from 'lucide-react';
import MedicalBackground from '../components/background';
import '../index.css';
import API_BASE_URL from '../config/apiConfig';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, { username, email, password });
      localStorage.setItem('token', res.data.token);
      window.dispatchEvent(new Event('storage'));
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background */}
      <MedicalBackground />
      
      {/* Signup Form */}
      <div className="w-full max-w-md mx-auto relative z-10">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-100 p-8 animate-fade-in">
          {/* Header */}
          <div className="text-center pb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MediConnect
            </h1>
            <p className="text-purple-600 text-lg mt-2">
              Join your trusted healthcare companion
            </p>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-200 rounded-xl text-red-700 text-center">
              {error}
            </div>
          )}
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-purple-800 font-medium block">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 h-12 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 bg-white/50 backdrop-blur-sm rounded-xl px-4 transition-all duration-300"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-purple-800 font-medium block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 h-12 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 bg-white/50 backdrop-blur-sm rounded-xl px-4 transition-all duration-300"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-purple-800 font-medium block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 h-12 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 bg-white/50 backdrop-blur-sm rounded-xl px-4 transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-purple-400 hover:text-purple-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                  required
                />
                <span className="text-purple-700">I agree to the terms and conditions</span>
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-white font-semibold text-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-purple-600">
              Already have an account?{' '}
              <a href="/login" className="font-semibold text-purple-700 hover:text-purple-900 transition-colors">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
