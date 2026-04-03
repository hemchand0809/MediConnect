import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  Heart, 
  FileText, 
  Upload, 
  Edit3, 
  Save, 
  X, 
  Camera,
  Shield,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  Plus
} from 'lucide-react';
import API_BASE_URL from '../config/apiConfig';

const Profile = () => {
  const [user, setUser] = useState({ 
    username: '', 
    email: '', 
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContact: '',
    emergencyPhone: '',
    bloodType: '',
    allergies: '',
    medications: '',
    medicalHistory: '',
    profileImage: ''
  });
  const [form, setForm] = useState({ 
    username: '', 
    email: '', 
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContact: '',
    emergencyPhone: '',
    bloodType: '',
    allergies: '',
    medications: '',
    medicalHistory: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      
      try {
        setLoading(true);
        setError('');
        
        const response = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Handle the response data
        if (response.data) {
          const userData = response.data.data || response.data; // Handle both response formats
          
          // Format the data with default empty strings for form fields
          const formattedData = {
            username: userData.username || '',
            email: userData.email || '',
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            phone: userData.phone || '',
            dateOfBirth: userData.dateOfBirth ? userData.dateOfBirth.split('T')[0] : '', // Format date for date input
            gender: userData.gender || '',
            address: userData.address || '',
            city: userData.city || '',
            state: userData.state || '',
            zipCode: userData.zipCode || '',
            emergencyContact: userData.emergencyContact || '',
            emergencyPhone: userData.emergencyPhone || '',
            bloodType: userData.bloodType || '',
            allergies: Array.isArray(userData.allergies) ? userData.allergies.join(', ') : (userData.allergies || ''),
            medications: Array.isArray(userData.medications) ? userData.medications.join(', ') : (userData.medications || ''),
            medicalHistory: userData.medicalHistory || '',
            profileImage: userData.profileImage || ''
          };
          
          setUser(formattedData);
          setForm(formattedData);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        const errorMessage = err.response?.data?.message || 'Failed to load profile. Please try again.';
        setError(errorMessage);
        
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file.name);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      // Show loading state
      setLoading(true);
      
      // Prepare the data to send
      const dataToSend = { ...form };
      
      // Format date of birth if it exists
      if (dataToSend.dateOfBirth) {
        // Ensure date is in YYYY-MM-DD format
        dataToSend.dateOfBirth = new Date(dataToSend.dateOfBirth).toISOString();
      }
      
      // Convert empty strings to undefined for optional fields
      Object.keys(dataToSend).forEach(key => {
        if (dataToSend[key] === '') {
          dataToSend[key] = undefined;
        }
      });

      console.log('Sending update request with data:', dataToSend);
      
      const response = await axios.put(
        `${API_BASE_URL}/api/auth/profile`,
        dataToSend,
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          timeout: 10000 // 10 seconds timeout
        }
      );

      console.log('Update response:', response.data);

      // Update the user state with the response data
      if (response.data && response.data.success) {
        // Format the response data for the form
        const formatForForm = (data) => {
          return {
            ...data,
            // Convert arrays to comma-separated strings for the form
            allergies: Array.isArray(data.allergies) 
              ? data.allergies.join(', ')
              : data.allergies || '',
            medications: Array.isArray(data.medications)
              ? data.medications.join(', ')
              : data.medications || '',
            // Format date for date input
            dateOfBirth: data.dateOfBirth 
              ? new Date(data.dateOfBirth).toISOString().split('T')[0]
              : ''
          };
        };

        const formattedUser = formatForForm(response.data.data);
        
        // Update both user and form states
        setUser(formattedUser);
        setForm(formattedUser);
        setEditMode(false);
        
        const successMsg = response.data.message || 'Profile updated successfully!';
        setSuccess(successMsg);
        console.log('Profile update successful:', response.data.data);
        
        // Clear success message after 5 seconds
        setTimeout(() => setSuccess(''), 5000);
      } else {
        throw new Error(response.data?.message || 'Invalid response from server');
      }
    } catch (err) {
      console.error('Error updating profile:', {
        error: err,
        response: err.response?.data,
        status: err.response?.status
      });
      
      // Handle specific error cases
      if (err.response) {
        // Server responded with an error status code
        if (err.response.status === 400 && err.response.data.errors) {
          // Validation errors
          setError(
            `Validation error: ${err.response.data.errors.join(', ')}`
          );
        } else if (err.response.status === 401) {
          // Unauthorized
          localStorage.removeItem('token');
          navigate('/login');
          return;
        } else {
          // Other server errors
          setError(
            err.response.data.message || 
            `Server error (${err.response.status}): ${err.response.statusText}`
          );
        }
      } else if (err.request) {
        // Request was made but no response
        setError('No response from server. Please check your connection.');
      } else {
        // Other errors
        setError(err.message || 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'medical', name: 'Medical Info', icon: Stethoscope },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'emergency', name: 'Emergency', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-purple-100 p-8 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center border-4 border-white shadow-lg">
                {user.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-purple-600" />
                )}
              </div>
              {editMode && (
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-purple-700 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-xl text-purple-600 mb-4">Patient ID: #{user.username}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-5 h-5" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.bloodType && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <Heart className="w-5 h-5" />
                    <span>Blood Type: {user.bloodType}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              {!editMode ? (
                <button 
                  onClick={() => setEditMode(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Edit3 className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button 
                    type="submit"
                    form="profile-form"
                    className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save</span>
                  </button>
                  <button 
                    onClick={() => { setEditMode(false); setForm(user); }}
                    className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <X className="w-5 h-5" />
                    <span>Cancel</span>
                  </button>
          </div>
              )}
          <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span>Logout</span>
          </button>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-xl text-red-700 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-xl text-green-700 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>{success}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-xl overflow-hidden">
          <div className="flex flex-wrap border-b border-purple-100">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <form id="profile-form" onSubmit={handleSave} className="space-y-8">
              {activeTab === 'personal' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={form.dateOfBirth}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={form.zipCode}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'medical' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Type</label>
                    <select
                      name="bloodType"
                      value={form.bloodType}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50"
                    >
                      <option value="">Select Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Allergies</label>
                    <textarea
                      name="allergies"
                      value={form.allergies}
                      onChange={handleChange}
                      disabled={!editMode}
                      rows={3}
                      placeholder="List any known allergies..."
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Current Medications</label>
                    <textarea
                      name="medications"
                      value={form.medications}
                      onChange={handleChange}
                      disabled={!editMode}
                      rows={3}
                      placeholder="List current medications and dosages..."
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Medical History</label>
                    <textarea
                      name="medicalHistory"
                      value={form.medicalHistory}
                      onChange={handleChange}
                      disabled={!editMode}
                      rows={4}
                      placeholder="Describe your medical history, past surgeries, chronic conditions..."
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50"
                    />
          </div>
        </div>
              )}

              {activeTab === 'emergency' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Contact Name</label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={form.emergencyContact}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50"
                    />
            </div>
            <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Contact Phone</label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={form.emergencyPhone}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="space-y-6">
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Medical Documents</h3>
                    <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center">
                      <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Upload test results, prescriptions, medical reports</p>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors cursor-pointer"
                      >
                        <Plus className="w-5 h-5" />
                        <span>Choose Files</span>
                      </label>
                    </div>
                  </div>

                  {/* Uploaded Files List */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Uploaded Documents</h4>
                    <p className="text-gray-500 text-center py-8">No documents uploaded yet</p>
                  </div>
            </div>
              )}
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;