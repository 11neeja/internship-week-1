import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import jsPDF from 'jspdf';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  AlertTriangle,
  Trash2,
  Eye,
  Search
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Classification {
  id: string;
  itemName: string;
  category: string;
  hazardous: string[];
  confidence: number;
  date: string;
  imageUrl?: string;
  environmentalImpact?: {
    co2Saved: number;
    toxicityPrevented: string;
  };
}

function ClassificationReports() {
  const [classifications, setClassifications] = useState<Classification[]>([]);
  const [filteredClassifications, setFilteredClassifications] = useState<Classification[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    // Load classifications from localStorage and add mock data
    const stored = JSON.parse(localStorage.getItem('ecovision_classifications') || '[]');
    
    const mockClassifications: Classification[] = [
      {
        id: '1',
        itemName: 'iPhone 12 Pro',
        category: 'Small IT Equipment',
        hazardous: ['Lithium', 'Rare Earth Elements', 'Cobalt'],
        confidence: 94.5,
        date: '2025-01-15T10:30:00Z',
        imageUrl: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
        environmentalImpact: {
          co2Saved: 2.3,
          toxicityPrevented: 'High - Contains multiple rare earth elements'
        }
      },
      {
        id: '2',
        itemName: 'Dell XPS 13 Laptop',
        category: 'Large IT Equipment',
        hazardous: ['Lead', 'Mercury', 'Cadmium', 'Chromium'],
        confidence: 97.2,
        date: '2025-01-14T14:20:00Z',
        imageUrl: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg',
        environmentalImpact: {
          co2Saved: 8.7,
          toxicityPrevented: 'Very High - Contains heavy metals'
        }
      },
      {
        id: '3',
        itemName: 'Samsung 4K Monitor',
        category: 'Screens and Displays',
        hazardous: ['Mercury', 'Lead', 'Phosphor'],
        confidence: 91.8,
        date: '2025-01-13T09:15:00Z',
        imageUrl: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg',
        environmentalImpact: {
          co2Saved: 15.2,
          toxicityPrevented: 'Extreme - Contains lead glass'
        }
      },
      {
        id: '4',
        itemName: 'Wireless Mouse',
        category: 'Small IT Equipment',
        hazardous: ['Lithium', 'Plastic Compounds'],
        confidence: 89.3,
        date: '2025-01-12T16:45:00Z',
        imageUrl: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg',
        environmentalImpact: {
          co2Saved: 0.8,
          toxicityPrevented: 'Low - Minimal hazardous content'
        }
      },
      {
        id: '5',
        itemName: 'Gaming Keyboard',
        category: 'Small IT Equipment',
        hazardous: ['Plastic Compounds', 'Electronic Components'],
        confidence: 92.7,
        date: '2025-01-11T11:30:00Z',
        imageUrl: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg',
        environmentalImpact: {
          co2Saved: 1.2,
          toxicityPrevented: 'Medium - Contains plastic compounds'
        }
      }
    ];

    const allClassifications = [...stored, ...mockClassifications];
    setClassifications(allClassifications);
    setFilteredClassifications(allClassifications);
  }, []);

  useEffect(() => {
    let filtered = classifications;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      filtered = filtered.filter(item => new Date(item.date) >= filterDate);
    }

    setFilteredClassifications(filtered);
  }, [classifications, searchTerm, categoryFilter, dateFilter]);

  const categories = Array.from(new Set(classifications.map(item => item.category)));

  const generatePDF = (item: Classification) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('EcoVision Classification Report', 20, 30);
    
    // Item details
    doc.setFontSize(16);
    doc.text('Item Details', 20, 50);
    doc.setFontSize(12);
    doc.text(`Name: ${item.itemName}`, 20, 65);
    doc.text(`Category: ${item.category}`, 20, 75);
    doc.text(`Confidence: ${item.confidence}%`, 20, 85);
    doc.text(`Date: ${new Date(item.date).toLocaleDateString()}`, 20, 95);
    
    // Hazardous materials
    if (item.hazardous.length > 0) {
      doc.setFontSize(16);
      doc.text('Hazardous Materials', 20, 115);
      doc.setFontSize(12);
      item.hazardous.forEach((material, index) => {
        doc.text(`• ${material}`, 25, 130 + (index * 10));
      });
    }
    
    // Environmental impact
    if (item.environmentalImpact) {
      const yPos = 130 + (item.hazardous.length * 10) + 20;
      doc.setFontSize(16);
      doc.text('Environmental Impact', 20, yPos);
      doc.setFontSize(12);
      doc.text(`CO₂ Saved: ${item.environmentalImpact.co2Saved} kg`, 20, yPos + 15);
      doc.text(`Toxicity Level: ${item.environmentalImpact.toxicityPrevented}`, 20, yPos + 25);
    }
    
    doc.save(`${item.itemName}-classification-report.pdf`);
    toast.success('Report downloaded successfully!');
  };

  const generateBulkPDF = () => {
    const itemsToExport = selectedItems.length > 0 
      ? classifications.filter(item => selectedItems.includes(item.id))
      : filteredClassifications;

    if (itemsToExport.length === 0) {
      toast.error('No items to export');
      return;
    }

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('EcoVision Bulk Classification Report', 20, 30);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 40);
    doc.text(`Total Items: ${itemsToExport.length}`, 20, 50);
    
    let yPos = 70;
    
    itemsToExport.forEach((item, index) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 30;
      }
      
      doc.setFontSize(14);
      doc.text(`${index + 1}. ${item.itemName}`, 20, yPos);
      doc.setFontSize(10);
      doc.text(`Category: ${item.category} | Confidence: ${item.confidence}%`, 25, yPos + 10);
      doc.text(`Date: ${new Date(item.date).toLocaleDateString()}`, 25, yPos + 20);
      
      if (item.hazardous.length > 0) {
        doc.text(`Hazardous: ${item.hazardous.join(', ')}`, 25, yPos + 30);
        yPos += 40;
      } else {
        yPos += 30;
      }
      
      yPos += 10;
    });
    
    doc.save('ecovision-bulk-report.pdf');
    toast.success('Bulk report downloaded successfully!');
  };

  const deleteClassification = (id: string) => {
    const updated = classifications.filter(item => item.id !== id);
    setClassifications(updated);
    localStorage.setItem('ecovision_classifications', JSON.stringify(updated));
    toast.success('Classification deleted');
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedItems.length === filteredClassifications.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredClassifications.map(item => item.id));
    }
  };

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Classification Reports</h1>
              <p className="text-gray-600">View, manage, and export your classification history</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-2">
              <button
                onClick={generateBulkPDF}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search items..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={selectAll}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {selectedItems.length === filteredClassifications.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredClassifications.length} of {classifications.length} classifications
              {selectedItems.length > 0 && (
                <span className="ml-2 text-blue-600">({selectedItems.length} selected)</span>
              )}
            </p>
          </div>
        </motion.div>

        {/* Classifications Table */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {filteredClassifications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === filteredClassifications.length && filteredClassifications.length > 0}
                        onChange={selectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Confidence
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hazardous
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClassifications.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleSelectItem(item.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={item.itemName}
                              className="w-10 h-10 object-cover rounded-lg mr-3"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.itemName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {item.confidence}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.hazardous.length > 0 ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            {item.hazardous.length} items
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500">None</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(item.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => generatePDF(item)}
                            className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                            title="Download PDF"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteClassification(item.id)}
                            className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No classifications found</h3>
              <p className="text-gray-600">
                {searchTerm || categoryFilter !== 'all' || dateFilter !== 'all'
                  ? 'Try adjusting your filters to see more results.'
                  : 'Start classifying items to see your reports here.'}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default ClassificationReports;