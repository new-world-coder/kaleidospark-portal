import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Mail, Calendar, TrendingUp, ArrowRight, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { getContactSubmissions, getDiscoveryCallBookings, getNewsletterSubscribers } from '../../services/api';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    contacts: 0,
    bookings: 0,
    subscribers: 0,
    loading: true
  });
  const [recentActivity, setRecentActivity] = useState([]);

  const loadDashboardData = async () => {
    setStats(prev => ({ ...prev, loading: true }));
    
    try {
      const [contactsRes, bookingsRes, subscribersRes] = await Promise.all([
        getContactSubmissions(),
        getDiscoveryCallBookings(),
        getNewsletterSubscribers()
      ]);

      setStats({
        contacts: contactsRes.data?.length || 0,
        bookings: bookingsRes.data?.length || 0,
        subscribers: subscribersRes.data?.length || 0,
        loading: false
      });

      // Combine recent activity from all sources
      const activity = [];
      
      if (contactsRes.data) {
        contactsRes.data.slice(0, 3).forEach(contact => {
          activity.push({
            type: 'contact',
            title: `New contact from ${contact.name}`,
            subtitle: contact.company,
            time: new Date(contact.created_at).toLocaleDateString(),
            href: '/admin/contacts'
          });
        });
      }

      if (bookingsRes.data) {
        bookingsRes.data.slice(0, 3).forEach(booking => {
          activity.push({
            type: 'booking',
            title: `Discovery call booked by ${booking.name}`,
            subtitle: booking.company,
            time: new Date(booking.created_at).toLocaleDateString(),
            href: '/admin/bookings'
          });
        });
      }

      if (subscribersRes.data) {
        subscribersRes.data.slice(0, 2).forEach(subscriber => {
          activity.push({
            type: 'subscriber',
            title: `New newsletter subscriber`,
            subtitle: subscriber.email,
            time: new Date(subscriber.subscribed_at).toLocaleDateString(),
            href: '/admin/subscribers'
          });
        });
      }

      // Sort by most recent and take top 5
      activity.sort((a, b) => new Date(b.time) - new Date(a.time));
      setRecentActivity(activity.slice(0, 5));

    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      toast.error('Failed to load dashboard data');
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Contact Submissions',
      value: stats.contacts,
      icon: Mail,
      color: 'blue',
      href: '/admin/contacts'
    },
    {
      title: 'Discovery Calls',
      value: stats.bookings,
      icon: Calendar,
      color: 'green',
      href: '/admin/bookings'
    },
    {
      title: 'Newsletter Subscribers',
      value: stats.subscribers,
      icon: Users,
      color: 'purple',
      href: '/admin/subscribers'
    },
    {
      title: 'Conversion Rate',
      value: stats.contacts > 0 ? Math.round((stats.bookings / stats.contacts) * 100) + '%' : '0%',
      icon: TrendingUp,
      color: 'orange',
      href: '/admin/analytics'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'contact':
        return <Mail className="w-4 h-4 text-blue-600" />;
      case 'booking':
        return <Calendar className="w-4 h-4 text-green-600" />;
      case 'subscriber':
        return <Users className="w-4 h-4 text-purple-600" />;
      default:
        return <TrendingUp className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
          </div>
          <button
            onClick={loadDashboardData}
            disabled={stats.loading}
            className="btn-secondary flex items-center"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${stats.loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <Link
              key={stat.title}
              to={stat.href}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.loading ? '...' : stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 text-${stat.color}-600 rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {activity.subtitle}
                        </p>
                      </div>
                      <div className="text-xs text-gray-400">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                  <div className="pt-4">
                    <Link to="/admin/contacts" className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
                      View all activity
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No recent activity</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-4">
              <Link
                to="/admin/contacts"
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="font-medium text-blue-900">Review Contacts</span>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </Link>

              <Link
                to="/admin/bookings"
                className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-green-600 mr-3" />
                  <span className="font-medium text-green-900">Manage Bookings</span>
                </div>
                <ArrowRight className="w-4 h-4 text-green-600" />
              </Link>

              <Link
                to="/admin/subscribers"
                className="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="font-medium text-purple-900">View Subscribers</span>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-600" />
              </Link>

              <Link
                to="/"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="font-medium text-gray-900">View Website</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;