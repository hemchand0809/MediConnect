import { useState, useEffect } from "react";
import { CheckCircle2, Stethoscope, Heart, Users } from "lucide-react";
import { createAppointment, getAllSpecializations, getDoctorsBySpecialization } from '../config/apiConfig';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    healthIssue: "",
    symptoms: "",
    specialization: "",
    doctorId: "",
  });

  const [specializations, setSpecializations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSpecializations();
  }, []);

  const fetchSpecializations = async () => {
    try {
      const response = await getAllSpecializations();
      setSpecializations(response.data);
    } catch (error) {
      console.error('Error fetching specializations:', error);
    }
  };

  const fetchDoctorsBySpecialization = async (specialization) => {
    if (!specialization) {
      setDoctors([]);
      return;
    }
    
    setLoadingDoctors(true);
    try {
      const response = await getDoctorsBySpecialization(specialization);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setDoctors([]);
    } finally {
      setLoadingDoctors(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'specialization') {
      setFormData(prev => ({ ...prev, doctorId: "" }));
      fetchDoctorsBySpecialization(value);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!formData.healthIssue || !formData.specialization || !formData.doctorId) {
      setError("Health issue, specialization, and doctor selection are required to book your appointment.");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      
      const selectedDoctor = doctors.find(doc => doc._id === formData.doctorId);
      
      // Get current date and time
      const now = new Date();
      const currentDate = now.toISOString().split('T')[0];
      const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);
      
      const appointmentData = {
        ...formData,
        date: currentDate,
        time: currentTime,
        doctor: {
          doctorId: formData.doctorId,
          doctorName: selectedDoctor?.name,
          specialization: formData.specialization
        }
      };
      
      const response = await createAppointment(appointmentData, token || null);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error booking appointment:", error);
      setError(error.message || "Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      healthIssue: "",
      symptoms: "",
      specialization: "",
      doctorId: "",
    });
    setIsSubmitted(false);
    setError("");
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-100 p-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Appointment Booked Successfully!</h2>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for choosing MediConnect. Your appointment has been confirmed.
        </p>
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Appointment Details:</h3>
          <div className="text-gray-600 space-y-1">
            <p><strong>Doctor:</strong> {doctors.find(doc => doc._id === formData.doctorId)?.name}</p>
            <p><strong>Specialization:</strong> {formData.specialization}</p>
            <p><strong>Health Issue:</strong> {formData.healthIssue}</p>
            {formData.symptoms && <p><strong>Symptoms:</strong> {formData.symptoms}</p>}
          </div>
        </div>
        <button 
          onClick={resetForm}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-100 p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-4">
          <Stethoscope className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Book Your Appointment</h2>
        <p className="text-gray-600">Fill out the form below to schedule your consultation</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 flex items-center">
            <Stethoscope className="w-5 h-5 mr-3 text-purple-600" />
            Medical Specialization
          </label>
          <select
            value={formData.specialization}
            onChange={e => handleInputChange("specialization", e.target.value)}
            className="h-14 border-2 border-purple-200 focus:border-purple-500 focus:ring-0 transition-all duration-300 rounded-xl bg-white/50 w-full px-4"
            required
          >
            <option value="">Select specialization</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>

        {formData.specialization && (
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center">
              <Users className="w-5 h-5 mr-3 text-blue-600" />
              Select Doctor
            </label>
            {loadingDoctors ? (
              <div className="h-14 border-2 border-purple-200 rounded-xl bg-white/50 flex items-center justify-center">
                <span className="text-gray-500">Loading doctors...</span>
              </div>
            ) : (
              <select
                value={formData.doctorId}
                onChange={e => handleInputChange("doctorId", e.target.value)}
                className="h-14 border-2 border-purple-200 focus:border-purple-500 focus:ring-0 transition-all duration-300 rounded-xl bg-white/50 w-full px-4"
                required
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name} - {doctor.experience} years exp. (₹{doctor.consultationFee})
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 flex items-center">
            <Heart className="w-5 h-5 mr-3 text-red-500" />
            Health Issue / Reason for Visit
          </label>
          <input
            type="text"
            placeholder="Describe your primary health concern"
            value={formData.healthIssue}
            onChange={e => handleInputChange("healthIssue", e.target.value)}
            className="h-14 border-2 border-purple-200 focus:border-purple-500 focus:ring-0 transition-all duration-300 rounded-xl bg-white/50 w-full px-4"
            required
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 flex items-center">
            <Heart className="w-5 h-5 mr-3 text-orange-500" />
            Additional Symptoms (Optional)
          </label>
          <textarea
            placeholder="Describe any additional symptoms or details"
            value={formData.symptoms}
            onChange={e => handleInputChange("symptoms", e.target.value)}
            rows={3}
            className="border-2 border-purple-200 focus:border-purple-500 focus:ring-0 transition-all duration-300 rounded-xl bg-white/50 w-full px-4 py-3 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {isSubmitting ? "Booking Appointment..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
