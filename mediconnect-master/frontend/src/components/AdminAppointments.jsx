import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  AlertCircle,
  Trash2,
  RefreshCw,
  User,
  Stethoscope,
  Clock
} from 'lucide-react';
import API_BASE_URL from '../config/apiConfig';

const STATUS_OPTIONS = [
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' }
];

const AdminAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [filterStatus, setFilterStatus] = useState('all');

  const showMessage = useCallback((type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  }, []);

  const fetchAppointments = useCallback(async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments(Array.isArray(data.data) ? data.data : data.appointments || []);
      }
    } catch (error) {
      showMessage('error', 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  }, [showMessage]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchAppointments();
  }, [navigate, fetchAppointments]);

  const handleStatusChange = async (appointmentId, status) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        showMessage('success', 'Appointment updated successfully');
        fetchAppointments();
      } else {
        const error = await response.json();
        showMessage('error', error.message || 'Failed to update appointment');
      }
    } catch (error) {
      showMessage('error', 'Failed to update appointment');
    }
  };

  const handleDelete = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) {
      return;
    }

    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/appointments/${appointmentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        showMessage('success', 'Appointment deleted successfully');
        fetchAppointments();
      } else {
        const error = await response.json();
        showMessage('error', error.message || 'Failed to delete appointment');
      }
    } catch (error) {
      showMessage('error', 'Failed to delete appointment');
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (filterStatus === 'all') {
      return true;
    }
    return (appointment.status || 'scheduled').toLowerCase() === filterStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Appointment Management</h1>
              <p className="text-sm text-purple-100">Track and update patient appointments</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2" />
            )}
            {message.text}
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              All
            </button>
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilterStatus(option.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === option.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button
            onClick={fetchAppointments}
            className="inline-flex items-center px-4 py-2 bg-white text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading appointments...</p>
            </div>
          ) : filteredAppointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Schedule
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.map((appointment) => {
                    const status = (appointment.status || 'scheduled').toLowerCase();
                    const appointmentDate = appointment.date ? new Date(appointment.date) : null;
                    const dateDisplay = appointmentDate
                      ? `${appointmentDate.toLocaleDateString()} ${
                          appointment.time || appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }`
                      : appointment.time || 'N/A';

                    return (
                      <tr key={appointment._id || appointment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {appointment.patientName || appointment.userName || 'Unknown Patient'}
                              </div>
                              <div className="text-sm text-gray-500">{appointment.patientEmail || 'N/A'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Stethoscope className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {appointment.doctorName || 'Unassigned'}
                              </div>
                              <div className="text-sm text-gray-500">{appointment.specialization || appointment.doctorSpecialization || '—'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-2" />
                            {dateDisplay}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={status}
                            onChange={(event) => handleStatusChange(appointment._id || appointment.id, event.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            {STATUS_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDelete(appointment._id || appointment.id)}
                            className="inline-flex items-center text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5 mr-1" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No appointments found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAppointments;
