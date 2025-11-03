import React, { useEffect, useState } from 'react';
import { orderService } from '../../api/orders';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { BarChart3, TrendingUp, DollarSign, ShoppingBag } from 'lucide-react';

const Reports: React.FC = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await orderService.getStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <LoadingSpinner size="lg" message="Loading reports..." />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-8 h-8 text-deep-blue" />
        <h1 className="text-3xl font-bold text-gray-900">Sales Reports</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-green-500" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            ₹{stats.totalRevenue.toLocaleString('en-IN')}
          </h3>
          <p className="text-sm text-gray-600">Total Revenue</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <ShoppingBag className="w-8 h-8 text-blue-500" />
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalOrders}</h3>
          <p className="text-sm text-gray-600">Total Orders</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8 text-yellow-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.pendingOrders}</h3>
          <p className="text-sm text-gray-600">Pending Orders</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <ShoppingBag className="w-8 h-8 text-green-500" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.completedOrders}</h3>
          <p className="text-sm text-gray-600">Completed Orders</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Sales Overview</h2>
        <div className="text-center py-12 text-gray-500">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>Detailed charts and analytics will be displayed here</p>
          <p className="text-sm mt-2">Integration with charting libraries can be added</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
