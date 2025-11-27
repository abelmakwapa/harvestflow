import { Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

export function Hero({ setActiveSection }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-500 to-emerald-700 py-20 px-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Next-Generation Agricultural Intelligence</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white mb-6 px-4"
          >
            Transform Your Farm with AI-Powered Intelligence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-emerald-50 mb-8 md:mb-10 max-w-3xl mx-auto px-4"
          >
            Real-time crop grading, smart logistics optimization, live marketplace trading, 
            and predictive weather analytics—powered by advanced AI technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <button
              onClick={() => setActiveSection('quality')}
              className="px-8 py-4 bg-white text-emerald-600 rounded-xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
            >
              Try AI Grading
            </button>
            <button
              onClick={() => setActiveSection('marketplace')}
              className="px-8 py-4 bg-emerald-800/50 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl hover:bg-emerald-800/70 transition-all"
            >
              Explore Marketplace
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <TrendingUp className="w-8 h-8 text-white mb-3 mx-auto" />
              <h3 className="text-white mb-2">98% Accuracy</h3>
              <p className="text-emerald-50 text-sm">AI crop quality assessment</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <ShieldCheck className="w-8 h-8 text-white mb-3 mx-auto" />
              <h3 className="text-white mb-2">Real-Time</h3>
              <p className="text-emerald-50 text-sm">Live weather & market data</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Sparkles className="w-8 h-8 text-white mb-3 mx-auto" />
              <h3 className="text-white mb-2">Smart Routes</h3>
              <p className="text-emerald-50 text-sm">AI-optimized logistics</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}