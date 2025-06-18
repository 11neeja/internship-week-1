import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { 
  Upload, 
  Camera, 
  Image as ImageIcon, 
  AlertTriangle, 
  CheckCircle,
  Loader,
  FileText,
  Recycle
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ClassificationResult {
  itemName: string;
  category: string;
  hazardous: string[];
  confidence: number;
  recyclingTips: string[];
  environmentalImpact: {
    co2Saved: number;
    toxicityPrevented: string;
  };
}

function UploadClassify() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [classifying, setClassifying] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    setResult(null);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const mockClassificationResults: ClassificationResult[] = [
    {
      itemName: 'Smartphone',
      category: 'Small IT Equipment',
      hazardous: ['Lithium', 'Rare Earth Elements', 'Cobalt'],
      confidence: 94.5,
      recyclingTips: [
        'Remove battery before disposal',
        'Take to certified e-waste recycling center',
        'Data wipe recommended before disposal'
      ],
      environmentalImpact: {
        co2Saved: 2.3,
        toxicityPrevented: 'High - Contains multiple rare earth elements'
      }
    },
    {
      itemName: 'Laptop Computer',
      category: 'Large IT Equipment',
      hazardous: ['Lead', 'Mercury', 'Cadmium', 'Chromium'],
      confidence: 97.2,
      recyclingTips: [
        'Remove hard drive and destroy data',
        'Professional disassembly recommended',
        'Battery requires special handling'
      ],
      environmentalImpact: {
        co2Saved: 8.7,
        toxicityPrevented: 'Very High - Contains heavy metals'
      }
    },
    {
      itemName: 'CRT Monitor',
      category: 'Screens and Displays',
      hazardous: ['Lead', 'Mercury', 'Phosphor'],
      confidence: 91.8,
      recyclingTips: [
        'Handle with extreme care - contains lead',
        'Must be processed by certified facility',
        'Never break or disassemble'
      ],
      environmentalImpact: {
        co2Saved: 15.2,
        toxicityPrevented: 'Extreme - Contains lead glass'
      }
    }
  ];

  const handleClassify = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    setClassifying(true);
    
    // Simulate API call with loading time
    setTimeout(() => {
      const randomResult = mockClassificationResults[Math.floor(Math.random() * mockClassificationResults.length)];
      setResult(randomResult);
      setClassifying(false);
      toast.success('Classification completed!');
      
      // Save to localStorage for reports page
      const existingClassifications = JSON.parse(localStorage.getItem('ecovision_classifications') || '[]');
      const newClassification = {
        id: Date.now().toString(),
        ...randomResult,
        date: new Date().toISOString(),
        imageUrl: imagePreview
      };
      existingClassifications.unshift(newClassification);
      localStorage.setItem('ecovision_classifications', JSON.stringify(existingClassifications));
    }, 3000);
  };

  const reset = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">E-Waste Classification</h1>
          <p className="text-gray-600">Upload an image of your electronic item for AI-powered classification</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Image</h2>
              
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full max-h-64 mx-auto rounded-lg shadow-sm"
                    />
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={reset}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <Upload className="h-12 w-12 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        Drop your image here, or click to browse
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports JPG, PNG, WEBP up to 10MB
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Choose File
                    </label>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleClassify}
                  disabled={!selectedFile || classifying}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 font-semibold"
                >
                  {classifying ? (
                    <>
                      <Loader className="h-5 w-5 animate-spin" />
                      <span>Classifying...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="h-5 w-5" />
                      <span>Classify Item</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Classification Results</h2>
              
              {classifying ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                  <p className="text-gray-600">AI is analyzing your image...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  {/* Item Information */}
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{result.itemName}</h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {result.confidence}% confident
                      </span>
                    </div>
                    <p className="text-gray-600">{result.category}</p>
                  </div>

                  {/* Hazardous Materials */}
                  {result.hazardous.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                        Hazardous Materials
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.hazardous.map((material, idx) => (
                          <span
                            key={idx}
                            className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                          >
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Environmental Impact */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Recycle className="h-5 w-5 text-green-500 mr-2" />
                      Environmental Impact
                    </h4>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-800 mb-1">
                        <strong>CO₂ Saved:</strong> {result.environmentalImpact.co2Saved} kg
                      </p>
                      <p className="text-sm text-green-800">
                        <strong>Toxicity:</strong> {result.environmentalImpact.toxicityPrevented}
                      </p>
                    </div>
                  </div>

                  {/* Recycling Tips */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <FileText className="h-5 w-5 text-blue-500 mr-2" />
                      Recycling Guidelines
                    </h4>
                    <ul className="space-y-2">
                      {result.recyclingTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Camera className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">No classification yet</p>
                  <p className="text-sm text-gray-500">Upload an image to get started</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default UploadClassify;