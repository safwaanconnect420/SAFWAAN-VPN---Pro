import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield } from 'lucide-react';
import { useState } from 'react';
import MagicRings from './MagicRings';

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="relative min-h-screen overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      </div>

      {/* Magic Rings */}
      <div className="absolute inset-0 z-0 opacity-40">
        <MagicRings
          color="#A855F7"
          colorTwo="#6366F1"
          ringCount={6}
          speed={0.8}
          lineThickness={2}
          opacity={0.6}
          blur={1}
          followMouse
          mouseInfluence={0.2}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 backdrop-blur-xl">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-slate-200">🚀 Free Forever • Military Grade Encryption</span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-7xl md:text-8xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
                SAFWAAN VPN
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-slate-200 mb-4">
              Ultimate Config Manager
            </p>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Unlimited VPN configurations with DPI evasion, lightning-fast protocols, and regional optimization
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-bold text-lg text-white overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <div className="relative flex items-center justify-center gap-2">
                Start Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl font-bold text-lg text-white backdrop-blur-xl hover:border-purple-500/50 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 animate-shimmer" />
              <div className="relative">
                Explore Servers
              </div>
            </motion.button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: '🌍', title: 'Global Coverage', desc: '1000+ servers worldwide' },
              { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized for speed' },
              { icon: '🔒', title: 'Military Grade', desc: 'Enterprise encryption' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-slate-900/50 border border-slate-700/40 rounded-2xl p-6 backdrop-blur-xl">
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
