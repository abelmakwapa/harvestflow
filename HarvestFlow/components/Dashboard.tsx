import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Sprout, TruckIcon, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function Dashboard() {
  const monthlyRevenue = [
    { month: 'Jan', revenue: 45000, costs: 28000 },
    { month: 'Feb', revenue: 52000, costs: 31000 },
    { month: 'Mar', revenue: 48000, costs: 29000 },
    { month: 'Apr', revenue: 61000, costs: 35000 },
    { month: 'May', revenue: 72000, costs: 42000 },
    { month: 'Jun', revenue: 68000, costs: 38000 },
  ];

  const cropDistribution = [
    { name: 'Tomatoes', value: 35, color: '#ef4444' },
    { name: 'Lettuce', value: 25, color: '#10b981' },
    { name: 'Carrots', value: 20, color: '#f97316' },
    { name: 'Peppers', value: 12, color: '#eab308' },
    { name: 'Other', value: 8, color: '#6b7280' },
  ];

  const yieldData = [
    { week: 'W1', actual: 1200, predicted: 1150 },
    { week: 'W2', actual: 1350, predicted: 1300 },
    { week: 'W3', actual: 1280, predicted: 1320 },
    { week: 'W4', actual: 1420, predicted: 1400 },
    { week: 'W5', actual: 1580, predicted: 1550 },
    { week: 'W6', actual: 1650, predicted: 1620 },
  ];

  const stats = [
    { label: 'Total Revenue', value: '$346,000', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'emerald' },
    { label: 'Crop Yield', value: '8,480 lbs', change: '+8.2%', trend: 'up', icon: Sprout, color: 'green' },
    { label: 'Active Deliveries', value: '24', change: '-2', trend: 'down', icon: TruckIcon, color: 'blue' },
    { label: 'Quality Score', value: '96%', change: '+3.1%', trend: 'up', icon: TrendingUp, color: 'purple' },
  ];

  const recentActivity = [
    { type: 'sale', message: 'Sold 450 lbs of Organic Tomatoes', time: '2 hours ago', status: 'success' },
    { type: 'harvest', message: 'Harvested Field C - Lettuce', time: '5 hours ago', status: 'success' },
    { type: 'alert', message: 'Weather alert: Rain expected tomorrow', time: '8 hours ago', status: 'warning' },
    { type: 'delivery', message: 'Delivery D-1047 completed', time: '12 hours ago', status: 'success' },
  ];

  return (
    <section className="py-12 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8 px-4 md:px-0">
          <h1 className="text-emerald-600 mb-2">Dashboard</h1>
          <p className="text-lg md:text-xl text-gray-600">Comprehensive overview of your agricultural operations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8 px-4 md:px-0">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const getColorClasses = (color: string) => {
              const colorMap: Record<string, { bg: string; text: string }> = {
                emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
                green: { bg: 'bg-green-100', text: 'text-green-600' },
                blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
                purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
              };
              return colorMap[color] || colorMap.emerald;
            };
            const colors = getColorClasses(stat.color);
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className="text-2xl text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Revenue Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-gray-900 mb-6">Revenue & Costs</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="costs" fill="#ef4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Yield Prediction */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-gray-900 mb-6">Yield: Actual vs Predicted</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={yieldData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} />
                  <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#3b82f6', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Crop Distribution */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-gray-900 mb-6">Crop Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={cropDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {cropDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {cropDistribution.map((crop) => (
                  <div key={crop.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: crop.color }} />
                      <span className="text-sm text-gray-700">{crop.name}</span>
                    </div>
                    <span className="text-sm text-gray-900">{crop.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.status === 'success' ? 'bg-emerald-100' :
                      activity.status === 'warning' ? 'bg-orange-100' :
                      'bg-blue-100'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'success' ? 'bg-emerald-500' :
                        activity.status === 'warning' ? 'bg-orange-500' :
                        'bg-blue-500'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all text-left px-4">
                  Schedule Harvest
                </button>
                <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all text-left px-4">
                  Create Listing
                </button>
                <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all text-left px-4">
                  Plan Route
                </button>
                <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all text-left px-4">
                  View Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}