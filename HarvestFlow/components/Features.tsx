import { Camera, ShoppingBag, Route, CloudRain, BarChart3, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface FeaturesProps {
  setActiveSection: (section: string) => void;
}

export function Features({ setActiveSection }: FeaturesProps) {
  const features = [
    {
      icon: Camera,
      title: 'AI Quality Assessment',
      description: 'Instant crop grading using advanced computer vision. Upload photos for real-time quality analysis and market value estimation.',
      color: 'from-purple-500 to-pink-500',
      action: 'quality',
    },
    {
      icon: ShoppingBag,
      title: 'Live Marketplace',
      description: 'Buy and sell produce directly with verified sellers. Real-time pricing, instant transactions, and quality-verified products.',
      color: 'from-blue-500 to-cyan-500',
      action: 'marketplace',
    },
    {
      icon: Route,
      title: 'Smart Logistics',
      description: 'AI-powered route optimization with real-time traffic analysis, weather monitoring, and fuel efficiency calculations.',
      color: 'from-orange-500 to-red-500',
      action: 'logistics',
    },
    {
      icon: CloudRain,
      title: 'Weather Intelligence',
      description: 'Hyper-local forecasts, climate pattern analysis, and automated alerts to protect your crops and maximize yields.',
      color: 'from-emerald-500 to-green-500',
      action: 'weather',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights on crop performance, market trends, revenue tracking, and financial metrics in one place.',
      color: 'from-violet-500 to-purple-500',
      action: 'dashboard',
    },
    {
      icon: Zap,
      title: 'Automated Workflows',
      description: 'Set up intelligent triggers and automations for harvesting schedules, pricing updates, and delivery coordination.',
      color: 'from-yellow-500 to-orange-500',
      action: 'dashboard',
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 px-4">
          <h2 className="text-emerald-600 mb-4">Powerful Features</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to modernize your agricultural operations in one integrated platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveSection(feature.action)}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-emerald-200"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className="mt-4 text-emerald-600 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore feature</span>
                  <span>→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}