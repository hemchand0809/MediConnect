import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search,
  MessageSquare,
  Mail,
  Phone,
  User,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import API_BASE_URL from '../config/apiConfig';

const AdminQueries = () => {
  const navigate = useNavigate();
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, resolved

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchQueries();
  }, [navigate]);

  const fetchQueries = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/queries`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setQueries(data.queries || []);
      }
    } catch (error) {
      console.error('Error fetching queries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQueryStatus = async (queryId, status) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/queries/${queryId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchQueries();
      }
    } catch (error) {
      console.error('Error updating query status:', error);
    }
  };

  const deleteQuery = async (queryId) => {
    if (!window.confirm('Are you sure you want to delete this query?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/queries/${queryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchQueries();
      }
    } catch (error) {
      console.error('Error deleting query:', error);
    }
  };

  const filteredQueries = queries.filter(query => {
    const matchesSearch = 
      query.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.message?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || query.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: queries.length,
    pending: queries.filter(q => q.status === 'pending').length,
    resolved: queries.filter(q => q.status === 'resolved').length
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      case 'resolved':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Resolved</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">User Queries & Support</h1>
              <p className="text-sm text-orange-100">Manage customer inquiries and support tickets</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Queries</p>
                <p className="text-3xl font-bold text-gray-900">{statusCounts.all}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-3xl font-bold text-gray-900">{statusCounts.pending}</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Resolved</p>
                <p className="text-3xl font-bold text-gray-900">{statusCounts.resolved}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search queries by name, email, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              All ({statusCounts.all})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'pending'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Pending ({statusCounts.pending})
            </button>
            <button
              onClick={() => setFilterStatus('resolved')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'resolved'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Resolved ({statusCounts.resolved})
            </button>
          </div>
        </div>

        {/* Queries List */}
        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading queries...</p>
            </div>
          ) : filteredQueries.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredQueries.map((query) => (
                <div key={query._id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-orange-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold text-gray-900">{query.name}</h3>
                            {getStatusBadge(query.status)}
                          </div>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              {query.email}
                            </span>
                            {query.phone && (
                              <span className="flex items-center">
                                <Phone className="h-4 w-4 mr-1" />
                                {query.phone}
                              </span>
                            )}
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {query.createdAt ? new Date(query.createdAt).toLocaleString() : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-3">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{query.message}</p>
                      </div>

                      <div className="flex items-center space-x-3">
                        {query.status === 'pending' && (
                          <button
                            onClick={() => updateQueryStatus(query._id, 'resolved')}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Mark as Resolved</span>
                          </button>
                        )}
                        {query.status === 'resolved' && (
                          <button
                            onClick={() => updateQueryStatus(query._id, 'pending')}
                            className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                          >
                            <AlertCircle className="h-4 w-4" />
                            <span>Mark as Pending</span>
                          </button>
                        )}
                        <button
                          onClick={() => deleteQuery(query._id)}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          <XCircle className="h-4 w-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No queries found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminQueries;