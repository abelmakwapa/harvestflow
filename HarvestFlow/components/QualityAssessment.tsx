import { useState, useRef } from 'react';
import { Camera, Upload, Zap, CheckCircle, AlertCircle, Star, TrendingUp, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function QualityAssessment() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleResults = {
    grade: 'A+',
    score: 96,
    quality: 'Premium',
    defects: 2,
    color: 'Excellent',
    size: 'Large',
    ripeness: 95,
    freshness: 98,
    marketValue: '$4.80/lb',
    recommendations: [
      'Harvest immediately for optimal quality',
      'Store at 35-40°F to maintain freshness',
      'Premium grade - suitable for export markets',
    ],
    details: {
      colorScore: 98,
      sizeScore: 94,
      shapeScore: 96,
      surfaceScore: 95,
    },
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setAnalyzing(true);
    setResults(null);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalyzing(false);
      setResults(sampleResults);
    }, 3000);
  };

  const useSampleImage = () => {
    setSelectedImage('https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800');
    analyzeImage();
  };

  const getGradeColor = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'from-emerald-500 to-green-600';
    if (grade === 'B+' || grade === 'B') return 'from-blue-500 to-cyan-500';
    return 'from-orange-500 to-red-500';
  };

  return (
    <section className="py-12 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8 px-4 md:px-0">
          <h1 className="text-emerald-600 mb-2">AI Quality Assessment</h1>
          <p className="text-lg md:text-xl text-gray-600">Instant crop grading and quality analysis using advanced computer vision</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8 px-4 md:px-0">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl text-emerald-600 mb-1">98%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl text-emerald-600 mb-1">&lt;2s</div>
            <div className="text-sm text-gray-600">Analysis Time</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl text-emerald-600 mb-1">12K+</div>
            <div className="text-sm text-gray-600">Crops Analyzed</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl text-emerald-600 mb-1">50+</div>
            <div className="text-sm text-gray-600">Crop Types</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 px-4 md:px-0">
          {/* Upload Section */}
          <div className="space-y-4 md:space-y-6">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <h2 className="text-gray-900 mb-6">Upload Crop Image</h2>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all"
              >
                {selectedImage ? (
                  <div className="relative">
                    <img src={selectedImage} alt="Selected crop" className="w-full h-64 object-cover rounded-xl" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                        setResults(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-gray-900 mb-2">Click to upload or drag and drop</h3>
                    <p className="text-gray-500">PNG, JPG up to 10MB</p>
                  </>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload Image</span>
                </button>
                <button
                  onClick={useSampleImage}
                  className="flex-1 py-3 border-2 border-emerald-500 text-emerald-600 rounded-xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  <span>Try Sample</span>
                </button>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-lg">
              <h3 className="text-white mb-6">How AI Grading Works</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span>1</span>
                  </div>
                  <div>
                    <h4 className="text-white mb-1">Image Capture</h4>
                    <p className="text-purple-100 text-sm">Upload or capture high-quality crop images</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span>2</span>
                  </div>
                  <div>
                    <h4 className="text-white mb-1">AI Analysis</h4>
                    <p className="text-purple-100 text-sm">Advanced computer vision analyzes 50+ parameters</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span>3</span>
                  </div>
                  <div>
                    <h4 className="text-white mb-1">Instant Grading</h4>
                    <p className="text-purple-100 text-sm">Receive quality grade and market value estimate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div>
            <AnimatePresence>
              {analyzing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-20 h-20 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-6"
                    />
                    <h3 className="text-gray-900 mb-2">Analyzing Crop Quality...</h3>
                    <p className="text-gray-600">AI is processing your image</p>
                    <div className="mt-6 space-y-2">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-sm text-gray-500"
                      >
                        ✓ Detecting crop type...
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-sm text-gray-500"
                      >
                        ✓ Analyzing color and ripeness...
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="text-sm text-gray-500"
                      >
                        ✓ Detecting defects and blemishes...
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                        className="text-sm text-gray-500"
                      >
                        ✓ Calculating quality grade...
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {results && !analyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Grade Card */}
                  <div className={`bg-gradient-to-br ${getGradeColor(results.grade)} rounded-2xl p-8 text-white shadow-lg`}>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-6xl mb-2">{results.grade}</div>
                        <div className="text-xl opacity-90">{results.quality} Quality</div>
                      </div>
                      <div className="text-center">
                        <Award className="w-16 h-16 mb-2 mx-auto" />
                        <div className="text-2xl">{results.score}/100</div>
                      </div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span>Estimated Market Value</span>
                        <span className="text-2xl">{results.marketValue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Scores */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-gray-900 mb-4">Detailed Analysis</h3>
                    <div className="space-y-4">
                      {Object.entries(results.details).map(([key, value]) => (
                        <div key={key}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-700 capitalize">{key.replace('Score', '')}</span>
                            <span className="text-emerald-600">{value}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="text-gray-600">Ripeness</span>
                      </div>
                      <div className="text-2xl text-emerald-600">{results.ripeness}%</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="text-gray-600">Freshness</span>
                      </div>
                      <div className="text-2xl text-yellow-600">{results.freshness}%</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-600">Defects</span>
                      </div>
                      <div className="text-2xl text-blue-600">{results.defects}</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-purple-500" />
                        <span className="text-gray-600">Size</span>
                      </div>
                      <div className="text-2xl text-purple-600">{results.size}</div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-gray-900 mb-4">AI Recommendations</h3>
                    <div className="space-y-3">
                      {results.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl">
                          <Zap className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-700">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {!analyzing && !results && (
                <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
                  <Camera className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">Ready to Analyze</h3>
                  <p className="text-gray-600">Upload an image to get instant quality assessment</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}