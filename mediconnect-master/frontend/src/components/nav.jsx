import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, Building2 } from 'lucide-react';
import { useCart } from './CartContext';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartPop, setCartPop] = useState(false);
  const navigate = useNavigate();
  const { getTotalItems } = useCart();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    // Listen for storage changes (e.g., logout in another tab)
    const handleStorage = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const handleCartPop = () => {
      setCartPop(true);
      setTimeout(() => setCartPop(false), 600);
    };
    window.addEventListener('cart-pop', handleCartPop);
    return () => window.removeEventListener('cart-pop', handleCartPop);
  }, []);

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('storage'));
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white text-violet-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-xl sm:text-2xl font-bold tracking-wide">MediConnect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-violet-600 hover:text-violet-400 transition-colors duration-200 font-medium">
              Home
            </Link>
            {isLoggedIn && (
              <>
                <Link to="/appointment" className="text-violet-600 hover:text-violet-400 transition-colors duration-200 font-medium">
                  Appointments
                </Link>
                <Link to="/medicines" className="text-violet-600 hover:text-violet-400 transition-colors duration-200 font-medium">
                  Meds
                </Link>
                <Link to="/prescription" className="text-violet-600 hover:text-violet-400 transition-colors duration-200 font-medium">
                  Prescription
                </Link>
                <Link to="/medical-records" className="text-violet-600 hover:text-violet-400 transition-colors duration-200 font-medium">
                  Med-Records
                </Link>
                <Link to="/lab-test" className="text-violet-600 hover:text-violet-400 transition-colors duration-200 font-medium">
                  Lab-Test
                </Link>
              </>
            )}
            <Link to="/about" className="text-violet-600 hover:text-violet-400 transition-colors duration-200 font-medium">
              About
            </Link>
            <div className="flex items-center space-x-2">
              <Link to="/doctor" className="text-blue-600 hover:text-blue-400 transition-colors duration-200 border border-blue-200 px-2.5 py-1 rounded-md" aria-label="Doctor Portal" title="Doctor Portal">
                <Stethoscope className="h-5 w-5" />
              </Link>
              <Link to="/doctor/phc" className="text-violet-700 hover:text-violet-500 transition-colors duration-200 border border-violet-200 px-2.5 py-1 rounded-md" aria-label="PHC Panel" title="PHC Panel">
                <Building2 className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Desktop Auth & Cart */}
          <div className="hidden lg:flex items-center space-x-6">
            {!isLoggedIn ? (
              <>
                <Link to="/signup" className="bg-violet-100 text-violet-600 px-4 py-2 rounded-md shadow hover:bg-violet-200 transition-colors duration-200 font-medium">
                  Sign Up
                </Link>
                <Link to="/login" className="bg-violet-600 text-white px-4 py-2 rounded-md shadow hover:bg-violet-500 transition-colors duration-200 font-medium">
                  Log In
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="bg-violet-100 text-violet-600 p-2 rounded-md shadow hover:bg-violet-200 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
                  </svg>
                </Link>
                <button onClick={handleLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded-md shadow hover:bg-red-200 transition-colors duration-200 font-medium">
                  Logout
                </button>
                <Link to="/cart" className="relative group ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-7 h-7 text-violet-600 group-hover:text-violet-800 transition-colors duration-200 ${cartPop ? 'animate-bounce' : ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386a2.25 2.25 0 012.12 1.575l.347 1.04M6.75 7.5h10.5m0 0l1.049 3.146a2.25 2.25 0 01-2.12 2.854H8.82a2.25 2.25 0 01-2.12-1.575L4.5 4.5m2.25 3h10.5m-6.75 9.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm7.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-violet-600 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[1.2rem] text-center font-medium">{getTotalItems()}</span>
                  )}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Cart & Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Mobile Cart - Only show when logged in */}
            {isLoggedIn && (
              <Link to="/cart" className="relative group">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 text-violet-600 group-hover:text-violet-800 transition-colors duration-200 ${cartPop ? 'animate-bounce' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386a2.25 2.25 0 012.12 1.575l.347 1.04M6.75 7.5h10.5m0 0l1.049 3.146a2.25 2.25 0 01-2.12 2.854H8.82a2.25 2.25 0 01-2.12-1.575L4.5 4.5m2.25 3h10.5m-6.75 9.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm7.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-xs rounded-full px-1 py-0.5 min-w-[1rem] text-center font-medium">{getTotalItems()}</span>
                )}
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="text-violet-600 hover:text-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 rounded-md p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg">
            {/* Navigation Links */}
            <Link
              to="/"
              className="block px-3 py-3 text-base font-medium text-violet-600 hover:text-violet-400 hover:bg-violet-50 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  to="/appointment"
                  className="block px-3 py-3 text-base font-medium text-violet-600 hover:text-violet-400 hover:bg-violet-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Appointment
                </Link>
                <Link
                  to="/medicines"
                  className="block px-3 py-3 text-base font-medium text-violet-600 hover:text-violet-400 hover:bg-violet-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Medicines
                </Link>
                <Link
                  to="/prescription"
                  className="block px-3 py-3 text-base font-medium text-violet-600 hover:text-violet-400 hover:bg-violet-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Prescription
                </Link>
                <Link
                  to="/medical-records"
                  className="block px-3 py-3 text-base font-medium text-violet-600 hover:text-violet-400 hover:bg-violet-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Med-Records
                </Link>
                <Link
                  to="/lab-test"
                  className="block px-3 py-3 text-base font-medium text-violet-600 hover:text-violet-400 hover:bg-violet-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Lab-Test
                </Link>
              </>
            )}
            <Link
              to="/about"
              className="block px-3 py-3 text-base font-medium text-violet-600 hover:text-violet-400 hover:bg-violet-50 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 pb-3 border-t border-gray-200">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    className="block px-3 py-3 text-base font-medium text-violet-600 hover:text-violet-400 hover:bg-violet-50 rounded-md transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                    className="block w-full text-left px-3 py-3 text-base font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/signup"
                    className="block px-3 py-3 text-base font-medium bg-violet-100 text-violet-600 hover:bg-violet-200 rounded-md transition-colors duration-200 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="block px-3 py-3 text-base font-medium bg-violet-600 text-white hover:bg-violet-500 rounded-md transition-colors duration-200 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
