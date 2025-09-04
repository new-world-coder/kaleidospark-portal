import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Mail, Calendar, Download, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { getContactSubmissions, getDiscoveryCallBookings, getNewsletterSubscribers } from '../../services/api';
import { toast } from 'sonner';

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    contacts: [],
    bookings: [],
    subscribers: [],
    loading: true
  });

  const [timeRange, setTimeRange] = useState('30'); // days
  const [chartData, setChartData] = useState({
    contacts: [],
    conversions: [],
    growth: []
  });

  const loadAnalytics = async () => {
    setAnalytics(prev => ({ ...prev, loading: true }));
    
    try {
      const [contactsRes, bookingsRes, subscribersRes] = await Promise.all([
        getContactSubmissions(),
        getDiscoveryCallBookings(),
        getNewsletterSubscribers()
      ]);

      const data = {
        contacts: contactsRes.data || [],
        bookings: bookingsRes.data || [],
        subscribers: subscribersRes.data || [],
        loading: false
      };

      setAnalytics(data);
      generateChartData(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
      toast.error('Failed to load analytics data');
      setAnalytics(prev => ({ ...prev, loading: false }));
    }
  };

  const generateChartData = (data) => {
    const days = parseInt(timeRange);
    const now = new Date();
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    // Generate daily data for the time range
    const dailyData = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      
      const contactsCount = data.contacts.filter(c => 
        new Date(c.created_at).toISOString().split('T')[0] === dateStr
      ).length;
      
      const bookingsCount = data.bookings.filter(b => 
        new Date(b.created_at).toISOString().split('T')[0] === dateStr
      ).length;
      
      const subscribersCount = data.subscribers.filter(s => 
        new Date(s.subscribed_at).toISOString().split('T')[0] === dateStr
      ).length;

      dailyData.push({
        date: dateStr,
        contacts: contactsCount,
        bookings: bookingsCount,
        subscribers: subscribersCount,
        conversion: contactsCount > 0 ? (bookingsCount / contactsCount) * 100 : 0
      });
    }

    setChartData({
      contacts: dailyData,
      conversions: dailyData,
      growth: dailyData
    });
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  useEffect(() => {
    if (!analytics.loading) {
      generateChartData(analytics);
    }
  }, [timeRange, analytics]);

  const calculateMetrics = () => {
    const { contacts, bookings, subscribers } = analytics;
    
    const totalContacts = contacts.length;
    const totalBookings = bookings.length;
    const totalSubscribers = subscribers.length;
    
    const conversionRate = totalContacts > 0 ? (totalBookings / totalContacts) * 100 : 0;
    
    // Calculate growth rates
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const contactsThisMonth = contacts.filter(c => new Date(c.created_at) >= thirtyDaysAgo).length;
    const subscribersThisMonth = subscribers.filter(s => new Date(s.subscribed_at) >= thirtyDaysAgo).length;

    return {
      totalContacts,
      totalBookings,
      totalSubscribers,
      conversionRate: conversionRate.toFixed(1),
      contactsThisMonth,
      subscribersThisMonth
    };
  };

  const metrics = calculateMetrics();

  const exportAnalytics = () => {
    const csvContent = [
      ['Metric', 'Value'],
      ['Total Contacts', metrics.totalContacts],
      ['Total Bookings', metrics.totalBookings],
      ['Total Subscribers', metrics.totalSubscribers],
      ['Conversion Rate', `${metrics.conversionRate}%`],
      ['Contacts This Month', metrics.contactsThisMonth],
      ['Subscribers This Month', metrics.subscribersThisMonth]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
            <p className="text-gray-600 mt-1">Track performance and growth metrics</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <button
              onClick={exportAnalytics}
              className="btn-secondary flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button
              onClick={loadAnalytics}
              className="btn-primary flex items-center"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${analytics.loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalContacts}</p>
                <p className="text-sm text-green-600 mt-1">+{metrics.contactsThisMonth} this month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Discovery Calls</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalBookings}</p>
                <p className="text-sm text-blue-600 mt-1">{metrics.conversionRate}% conversion</p>
              </div>
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Newsletter Subscribers</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalSubscribers}</p>
                <p className="text-sm text-purple-600 mt-1">+{metrics.subscribersThisMonth} this month</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.conversionRate}%</p>
                <p className="text-sm text-gray-600 mt-1">Contact to booking</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Contact Trends */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Trends</h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {chartData.contacts.slice(-14).map((day, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="bg-blue-500 rounded-t w-full min-h-[4px] transition-all hover:bg-blue-600"
                    style={{ 
                      height: `${Math.max(4, (day.contacts / Math.max(...chartData.contacts.map(d => d.contacts), 1)) * 200)}px` 
                    }}
                    title={`${day.contacts} contacts on ${day.date}`}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
                    {new Date(day.date).getDate()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                  <span className="font-medium">Website Visitors</span>
                </div>
                <span className="text-lg font-bold text-blue-600">~1,000</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                  <span className="font-medium">Contact Submissions</span>
                </div>
                <span className="text-lg font-bold text-green-600">{metrics.totalContacts}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                  <span className="font-medium">Discovery Calls</span>
                </div>
                <span className="text-lg font-bold text-purple-600">{metrics.totalBookings}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-500 rounded mr-3"></div>
                  <span className="font-medium">Qualified Leads</span>
                </div>
                <span className="text-lg font-bold text-orange-600">{Math.round(metrics.totalBookings * 0.7)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interest Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Interest Distribution</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['general', 'ai-strategy', 'automation', 'genai', 'data', 'training'].map(interest => {
              const count = analytics.contacts.filter(c => c.interest === interest).length;
              const percentage = analytics.contacts.length > 0 ? (count / analytics.contacts.length) * 100 : 0;
              
              return (
                <div key={interest} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{count}</div>
                  <div className="text-sm text-gray-600 capitalize">{interest.replace('-', ' ')}</div>
                  <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity Timeline</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {[...analytics.contacts, ...analytics.bookings, ...analytics.subscribers]
              .sort((a, b) => new Date(b.created_at || b.subscribed_at) - new Date(a.created_at || a.subscribed_at))
              .slice(0, 20)
              .map((item, index) => {
                const isContact = item.message !== undefined;
                const isBooking = item.preferred_date !== undefined;
                const isSubscriber = !isContact && !isBooking;
                
                return (
                  <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isContact ? 'bg-blue-100 text-blue-600' :
                      isBooking ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {isContact ? <Mail className="w-4 h-4" /> :
                       isBooking ? <Calendar className="w-4 h-4" /> :
                       <Users className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {isContact ? `New contact from ${item.name}` :
                         isBooking ? `Discovery call booked by ${item.name}` :
                         `New newsletter subscriber`}
                      </p>
                      <p className="text-xs text-gray-500">
                        {isContact || isBooking ? item.company : item.email} • 
                        {new Date(item.created_at || item.subscribed_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;