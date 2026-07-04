import { motion } from 'framer-motion';
import { BarChart3, CheckCircle, Globe, Shield, Smartphone, Zap } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import MagicRings from '../components/MagicRings';
import HeroSection from '../components/HeroSection';
import ConfigGenerator from '../components/ConfigGenerator';
import SmokeEffect from '../components/SmokeEffect';

const Home = () => {
  const navigate = useNavigate();
  const [protocolData] = useState([
    { name: 'VMess', value: 35, color: '#3b82f6' },
    { name: 'VLess', value: 25, color: '#10b981' },
    { name: 'Trojan', value: 15, color: '#8b5cf6' },
    { name: 'TUIC', value: 10, color: '#f59e0b' },
    { name: 'SS/SSR', value: 10, color: '#06b6d4' },
    { name: 'Hysteria2', value: 5, color: '#eab308' }
  ]);

  const features = [
    { icon: Globe, title: 'Global Servers', desc: 'Access servers from around the world with high speed', color: 'from-blue-500 to-cyan-500' },
    { icon: Zap, title: 'Lightning Fast', desc: 'Optimized connections for streaming and browsing', color: 'from-yellow-500 to-orange-500' },
    { icon: Shield, title: 'Secure & Private', desc: 'DPI evasion and strong encryption', color: 'from-green-500 to-emerald-500' },
    { icon: Smartphone, title: 'Mobile Optimized', desc: 'Works perfectly on all devices', color: 'from-purple-500 to-pink-500' }
  ];

  const categories = [
    { name: 'Facebook', icon: '📘', color: 'from-blue-500 to-blue-700' },
    { name: 'Instagram', icon: '📷', color: 'from-pink-500 to-purple-600' },
    { name: 'YouTube', icon: '▶️', color: 'from-red-500 to-red-700' },
    { name: 'TikTok', icon: '🎵', color: 'from-cyan-400 to-blue-600' },
    { name: 'Twitter/X', icon: '🐦', color: 'from-slate-800 to-slate-600' },
    { name: 'WhatsApp', icon: '💬', color: 'from-green-500 to-green-700' },
    { name: 'Telegram', icon: '✈️', color: 'from-blue-400 to-sky-600' },
    { name: 'All in One', icon: '🌐', color: 'from-indigo-500 to-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <SmokeEffect intensity={0.5} />

      {/* Hero Section */}
      <HeroSection />

      {/* Social Media Masking Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-black text-center mb-4 text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text"
          >
            Social Media Masking
          </motion.h2>
          <p className="text-center text-slate-300 text-lg mb-12">Optimized configs for your favorite platforms</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.08, y: -5 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`relative group overflow-hidden rounded-2xl p-8 bg-gradient-to-br ${cat.color} shadow-2xl border border-white/10 cursor-pointer`}
              >
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all" />
                <div className="relative z-10 text-center">
                  <div className="text-5xl mb-3">{cat.icon}</div>
                  <h3 className="text-xl font-bold">{cat.name}</h3>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative z-10 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-4 text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">Why Choose SAFWAAN?</h2>
          <p className="text-center text-slate-300 text-lg mb-12">Premium features that set us apart</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(168, 85, 247, 0.3)' }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feat.color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-all`} />
                <div className="relative bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all">
                  <feat.icon className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
                  <p className="text-slate-400">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Config Generator Section */}
      <ConfigGenerator />

      {/* Protocol Distribution */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <BarChart3 className="w-10 h-10 text-purple-400" />
              <h2 className="text-5xl font-black text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">Protocol Distribution</h2>
            </div>
            <p className="text-slate-400 text-lg">Our comprehensive VPN protocol support</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-3xl" />
            <div className="relative bg-slate-900/70 rounded-3xl p-8 border border-slate-800 backdrop-blur-xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={protocolData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {protocolData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                  {protocolData.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="font-semibold text-lg">{item.name}</span>
                      </div>
                      <span className="text-2xl font-bold" style={{ color: item.color }}>{item.value}%</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
