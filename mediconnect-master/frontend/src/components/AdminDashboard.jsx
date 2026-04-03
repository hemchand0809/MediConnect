import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Activity, 
  Calendar, 
  LogOut, 
  Shield,
  Stethoscope,
  MessageSquare,
  Clock,
  CheckCircle
} from 'lucide-react';
import API_BASE_URL from '../config/apiConfig';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    pendingQueries: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem('adminToken');
    const admin = localStorage.getItem('adminInfo');
    
    if (!token || !admin) {
      navigate('/admin/login');
      return;
    }

    setAdminInfo(JSON.parse(admin));
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats || {
          totalUsers: 0,
          totalDoctors: 0,
          totalAppointments: 0,
          pendingQueries: 0
        });
        setRecentActivity(data.recentActivity || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Doctors',
      value: stats.totalDoctors,
      icon: Stethoscope,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Appointments',
      value: stats.totalAppointments,
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Pending Queries',
      value: stats.pendingQueries,
      icon: MessageSquare,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  const menuItems = [
    {
      title: 'Doctor Management',
      description: 'Add, edit, and manage doctor accounts',
      icon: Stethoscope,
      path: '/admin/doctors',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'User Management',
      description: 'View and manage user accounts',
      icon: Users,
      path: '/admin/users',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Appointments',
      description: 'View all appointments and schedules',
      icon: Calendar,
      path: '/admin/appointments',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Queries & Support',
      description: 'Manage user queries and support tickets',
      icon: MessageSquare,
      path: '/admin/queries',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-red-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <Shield className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-purple-100">
                  Welcome back, {adminInfo?.name || 'Administrator'}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
              </div>
              <div className="mt-4">
                <div className={`h-1 rounded-full bg-gradient-to-r ${stat.color}`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-6 text-left group"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${item.color} mb-4`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-purple-600" />
                Recent Activity
              </h2>
              <span className="text-sm text-gray-500">Last 24 hours</span>
            </div>
          </div>
          <div className="p-6">
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;