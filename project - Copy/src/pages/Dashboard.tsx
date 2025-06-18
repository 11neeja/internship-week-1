import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { 
  Upload, 
  TrendingUp, 
  FileText, 
  Leaf, 
  Recycle,
  AlertTriangle,
  Calendar,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Classification {
  id: string;
  itemName: string;
  category: string;
  hazardous: string[];
  confidence: number;
  date: string;
  imageUrl: string;
}

function Dashboard() {
  const [classifications, setClassifications] = useState<Classification[]>([]);
  const [stats, setStats] = useState({
    totalClassifications: 0,
    co2Saved: 0,
    hazardousItemsDetected: 0,
    recyclingScore: 0
  });

  useEffect(() => {
    // Load mock data
    const mockClassifications: Classification[] = [
      {
        id: '1',
        itemName: 'iPhone 12',
        category: 'Small IT Equipment',
        hazardous: ['Lithium', 'Rare Earth Elements'],
        confidence: 94.5,
        date: '2025-01-15',
        imageUrl: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'
      },
      {
        id: '2',
        itemName: 'Dell Laptop',
        category: 'Large IT Equipment',
        hazardous: ['Lead', 'Mercury', 'Cadmium'],
        confidence: 97.2,
        date: '2025-01-14',
        imageUrl: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg'
      },
      {
        id: '3',
        itemName: 'LED Monitor',
        category: 'Screens and Displays',
        hazardous: ['Mercury', 'Lead'],
        confidence: 91.8,
        date: '2025-01-13',
        imageUrl: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg'
      }
    ];

    setClassifications(mockClassifications);
    setStats({
      totalClassifications: mockClassifications.length,
      co2Saved: 12.5,
      hazardousItemsDetected: mockClassifications.length,
      recyclingScore: 85
    });
  }, []);

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your e-waste classification overview.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Classifications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalClassifications}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">CO₂ Saved</p>
                <p className="text-2xl font-bold text-green-600">{stats.co2Saved} kg</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hazardous Items</p>
                <p className="text-2xl font-bold text-red-600">{stats.hazardousItemsDetected}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recycling Score</p>
                <p className="text-2xl font-bold text-blue-600">{stats.recyclingScore}%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Recycle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link
            to="/upload"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Upload className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Classify E-Waste</h3>
                <p className="text-blue-100">Upload and identify items</p>
              </div>
            </div>
          </Link>

          <Link
            to="/impact"
            className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">View Impact</h3>
                <p className="text-green-100">Track your contribution</p>
              </div>
            </div>
          </Link>

          <Link
            to="/reports"
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Generate Reports</h3>
                <p className="text-purple-100">Download detailed reports</p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Recent Classifications */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Classifications</h2>
              <Link
                to="/reports"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                View All
              </Link>
            </div>
          </div>

          <div className="p-6">
            {classifications.length > 0 ? (
              <div className="space-y-4">
                {classifications.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.itemName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{item.itemName}</h3>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {item.confidence}% confidence
                        </span>
                        {item.hazardous.length > 0 && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded flex items-center">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            {item.hazardous.length} hazardous elements
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No classifications yet</h3>
                <p className="text-gray-600 mb-4">
                  Start by uploading your first e-waste item for classification.
                </p>
                <Link
                  to="/upload"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload Item
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;