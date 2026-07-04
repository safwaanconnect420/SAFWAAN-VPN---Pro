import { motion } from 'framer-motion';
import { BarChart3, CheckCircle, Globe, Shield, Smartphone, Zap } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import MagicRings from '../components/MagicRings';

const Home = () => {
  const navigate = useNavigate();
  const [protocolData, setProtocolData] = useState([
    { name: 'VMess', value: 35, color: '#3b82f6' },
    { name: 'VLess', value: 25, color: '#10b981' },
    { name: 'Trojan', value: 15, color: '#8b5cf6' },
    { name: 'TUIC', value: 10, color: '#f59e0b' },
    { name: 'SS/SSR', value: 10, color: '#06b6d4' },
    { name: 'Hysteria2', value: 5, color: '#eab308' }
  ]);

  const features = [
    { icon: Globe, title: 'Global Servers', desc: 'Access servers from around the world with high speed' },
    { icon: Zap, title: 'Lightning Fast', desc: 'Optimized connections for streaming and browsing' },
    { icon: Shield, title: 'Secure & Private', desc: 'DPI evasion and strong encryption' },
    { icon: Smartphone, title: 'Mobile Optimized', desc: 'Works perfectly on all devices' }
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
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 blur-3xl" />

        {/* MagicRings Background */}
        <div className="absolute inset-0 z-0" style={{ opacity: 0.6 }}>
          <MagicRings
            color="#A855F7"
            colorTwo="#6366F1"
            ringCount={8}
            speed={1.2}
            attenuation={4}
            lineThickness={2}
            baseRadius={0.2}
            radiusStep={0.09}
            scaleRate={0.08}
            opacity={0.8}
            blur={2}
            noiseAmount={0.15}
            rotation={15}
            ringGap={1.4}
            fadeIn={0.4}
            fadeOut={1.0}
            followMouse
            mouseInfluence={0.3}
            hoverScale={1.3}
            parallax={0.06}
            clickBurst
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-700/50 mb-6 backdrop-blur-md">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-slate-200">100% Free • Enterprise Grade</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
              SAFWAAN VPN
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white/90">
              The Ultimate VPN Config Manager
            </h2>
            <p className="text-sm md:text-lg text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              World's most advanced VPN configuration manager with enterprise-grade encryption and DPI evasion
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/servers')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg shadow-purple-900/30"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/regional')}
                className="px-8 py-4 bg-slate-800 border border-slate-700 rounded-xl font-semibold text-lg hover:bg-slate-700 transition-all"
              >
                Regional Packages
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Social Media Masking
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(`/servers?category=${cat.name.toLowerCase().replace(' ', '-')}`)}
                className={`p-8 rounded-2xl bg-gradient-to-br ${cat.color} hover:scale-105 transition-all shadow-xl border border-white/10`}
              >
                <div className="text-5xl mb-4">{cat.icon}</div>
                <h3 className="text-xl font-semibold">{cat.name}</h3>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-all"
              >
                <feat.icon className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
                <p className="text-slate-400">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol Distribution */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <BarChart3 className="w-10 h-10 text-purple-400" />
              <h2 className="text-4xl font-bold">Protocol Distribution</h2>
            </div>
            <p className="text-slate-400 text-lg">See the breakdown of supported VPN protocols</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-900/70 rounded-3xl p-8 border border-slate-800"
          >
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

              <div className="space-y-4">
                {protocolData.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-semibold">{item.name}</span>
                    </div>
                    <span className="text-2xl font-bold" style={{ color: item.color }}>{item.value}%</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
