import { useState } from 'react';
import { Search, Filter, TrendingUp, Star, MapPin, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

export function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'vegetables', 'fruits', 'grains', 'dairy', 'organic'];

  const products = [
    {
      id: 1,
      name: 'Organic Tomatoes',
      category: 'vegetables',
      price: 3.50,
      unit: 'lb',
      seller: 'Green Valley Farm',
      location: 'California',
      rating: 4.8,
      stock: 450,
      grade: 'A+',
      trending: true,
      image: 'https://images.unsplash.com/photo-1757332334678-e76d258c49c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yZ2FuaWMlMjB0b21hdG9lc3xlbnwxfHx8fDE3NjQyMDAzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      name: 'Premium Apples',
      category: 'fruits',
      price: 2.80,
      unit: 'lb',
      seller: 'Orchard Hills',
      location: 'Washington',
      rating: 4.9,
      stock: 650,
      grade: 'A',
      trending: true,
      image: 'https://images.unsplash.com/photo-1623815242959-fb20354f9b8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBhcHBsZXMlMjBmcmVzaHxlbnwxfHx8fDE3NjQwOTQ3NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      name: 'Wheat Grain',
      category: 'grains',
      price: 0.45,
      unit: 'lb',
      seller: 'Plains Harvest',
      location: 'Kansas',
      rating: 4.7,
      stock: 12000,
      grade: 'A',
      trending: false,
      image: 'https://images.unsplash.com/photo-1595360584848-6404da6fe097?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGdyYWluJTIwaGFydmVzdHxlbnwxfHx8fDE3NjQxNzY5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 4,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 4.20,
      unit: 'lb',
      seller: 'Leafy Greens Co.',
      location: 'Arizona',
      rating: 4.6,
      stock: 320,
      grade: 'A+',
      trending: false,
      image: 'https://images.unsplash.com/photo-1634731201932-9bd92839bea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNwaW5hY2glMjBsZWF2ZXN8ZW58MXx8fHwxNzY0MjAwMzQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 5,
      name: 'Organic Strawberries',
      category: 'fruits',
      price: 5.50,
      unit: 'lb',
      seller: 'Berry Best Farm',
      location: 'Oregon',
      rating: 5.0,
      stock: 180,
      grade: 'A+',
      trending: true,
      image: 'https://images.unsplash.com/photo-1724128276094-06040d643dbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwc3RyYXdiZXJyaWVzfGVufDF8fHx8MTc2NDIwMDM0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 6,
      name: 'Raw Honey',
      category: 'organic',
      price: 12.00,
      unit: 'jar',
      seller: 'Bee Happy Farms',
      location: 'Vermont',
      rating: 4.9,
      stock: 95,
      grade: 'A+',
      trending: false,
      image: 'https://images.unsplash.com/photo-1692797178143-659c48c34135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25leSUyMGphciUyMG5hdHVyYWx8ZW58MXx8fHwxNzY0MTA2MDkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-12 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-emerald-600 mb-2">Live Marketplace</h1>
          <p className="text-xl text-gray-600">Buy and sell fresh produce with verified farmers and suppliers</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl text-emerald-600 mb-1">1,247</div>
            <div className="text-sm text-gray-600">Active Listings</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl text-emerald-600 mb-1">582</div>
            <div className="text-sm text-gray-600">Verified Sellers</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl text-emerald-600 mb-1">$2.4M</div>
            <div className="text-sm text-gray-600">Daily Volume</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl text-emerald-600 mb-1">98.5%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products, sellers, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-gray-900 mb-1">{product.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{product.seller}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{product.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl text-emerald-600">${product.price}</div>
                    <div className="text-sm text-gray-500">per {product.unit}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{product.stock} {product.unit}s</div>
                    <div className="text-xs text-gray-500">in stock</div>
                  </div>
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}