import React from 'react';
import { Heart, Activity, Shield, Users } from 'lucide-react';

const MedicalBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50"></div>
      
      {/* Floating medical icons */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 animate-bounce delay-100">
          <Heart className="h-8 w-8 text-purple-300 opacity-60" />
        </div>
        <div className="absolute top-40 right-32 animate-bounce delay-300">
          <Activity className="h-6 w-6 text-purple-400 opacity-50" />
        </div>
        <div className="absolute bottom-32 left-32 animate-bounce delay-500">
          <Shield className="h-10 w-10 text-purple-300 opacity-40" />
        </div>
        <div className="absolute bottom-40 right-20 animate-bounce delay-700">
          <Users className="h-7 w-7 text-purple-400 opacity-60" />
        </div>
      </div>
      
      {/* Geometric shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/10 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 rounded-lg bg-purple-200/20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 rounded-full bg-purple-300/30 animate-pulse delay-500"></div>
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(45deg,transparent_49%,rgba(147,51,234,0.1)_49%,rgba(147,51,234,0.1)_51%,transparent_51%)] bg-[length:20px_20px]"></div>
      </div>
    </div>
  );
};

export default MedicalBackground;
