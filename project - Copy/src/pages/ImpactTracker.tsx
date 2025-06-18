import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { 
  Leaf, 
  TrendingUp, 
  Award, 
  Target,
  Calendar,
  BarChart3
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

interface ImpactData {
  totalCO2Saved: number;
  itemsClassified: number;
  hazardousItemsDetected: number;
  recyclingScore: number;
  monthlyData: Array<{
    month: string;
    co2Saved: number;
    itemsClassified: number;
  }>;
  categoryData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

function ImpactTracker() {
  const [impactData, setImpactData] = useState<ImpactData | null>(null);
  const [timeRange, setTimeRange] = useState('6months');

  useEffect(() => {
    // Mock impact data
    const mockData: ImpactData = {
      totalCO2Saved: 127.3,
      itemsClassified: 42,
      hazardousItemsDetected: 28,
      recyclingScore: 87,
      monthlyData: [
        { month: 'Aug', co2Saved: 12.5, itemsClassified: 5 },
        { month: 'Sep', co2Saved: 18.2, itemsClassified: 8 },
        { month: 'Oct', co2Saved: 25.1, itemsClassified: 12 },
        { month: 'Nov', co2Saved: 31.8, itemsClassified: 9 },
        { month: 'Dec', co2Saved: 22.4, itemsClassified: 6 },
        { month: 'Jan', co2Saved: 17.3, itemsClassified: 2 }
      ],
      categoryData: [
        { name: 'Small IT Equipment', value: 45, color: '#3B82F6' },
        { name: 'Large IT Equipment', value: 30, color: '#10B981' },
        { name: 'Screens & Displays', value: 15, color: '#F59E0B' },
        { name: 'Other', value: 10, color: '#EF4444' }
      ]
    };

    setImpactData(mockData);
  }, [timeRange]);

  const achievements = [
    {
      title: 'Eco Warrior',
      description: 'Classified 25+ items',
      icon: Award,
      completed: true,
      progress: 100
    },
    {
      title: 'Carbon Saver',
      description: 'Saved 100kg CO₂',
      icon: Leaf,
      completed: true,
      progress: 100
    },
    {
      title: 'Hazard Detector',
      description: 'Identified 20+ hazardous items',
      icon: Target,
      completed: true,
      progress: 100
    },
    {
      title: 'Recycling Master',
      description: 'Achieve 90% recycling score',
      icon: TrendingUp,
      completed: false,
      progress: 87
    }
  ];

  if (!impactData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Impact Tracker</h1>
              <p className="text-gray-600">Monitor your environmental contribution and achievements</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="3months">Last 3 months</option>
                <option value="6months">Last 6 months</option>
                <option value="1year">Last year</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Impact Summary Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total CO₂ Saved</p>
                <p className="text-3xl font-bold">{impactData.totalCO2Saved}</p>
                <p className="text-green-100 text-sm">kg</p>
              </div>
              <Leaf className="h-12 w-12 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Items Classified</p>
                <p className="text-3xl font-bold">{impactData.itemsClassified}</p>
                <p className="text-blue-100 text-sm">total</p>
              </div>
              <BarChart3 className="h-12 w-12 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Hazardous Items</p>
                <p className="text-3xl font-bold">{impactData.hazardousItemsDetected}</p>
                <p className="text-red-100 text-sm">detected</p>
              </div>
              <Target className="h-12 w-12 text-red-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Recycling Score</p>
                <p className="text-3xl font-bold">{impactData.recyclingScore}%</p>
                <p className="text-purple-100 text-sm">efficiency</p>
              </div>
              <Award className="h-12 w-12 text-purple-200" />
            </div>
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* CO2 Savings Over Time */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">CO₂ Savings Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={impactData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="co2Saved" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Classification by Category */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Classification by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={impactData.categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                >
                  {impactData.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {impactData.categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Monthly Items Chart */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Items Classified Monthly</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={impactData.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="itemsClassified" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      achievement.completed
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            achievement.completed
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-400 text-white'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                      {achievement.completed && (
                        <div className="text-green-500">
                          <Award className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          achievement.completed ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{achievement.progress}% complete</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ImpactTracker;