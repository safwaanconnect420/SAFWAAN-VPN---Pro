import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Copy, Globe, MapPin, Shield, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';
import GhostCursor from '../components/GhostCursor';

const API_URL = 'http://localhost:5000/api';

const Regional = () => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  const regionInfo = {
    ksa: {
      name: 'Saudi Arabia (KSA)',
      icon: '🇸🇦',
      providers: ['Salam', 'STC', 'Zain', 'Mobily'],
      description: 'Social package optimized configs for KSA telecom providers'
    },
    uae: {
      name: 'United Arab Emirates (Dubai)',
      icon: '🇦🇪',
      providers: ['Etisalat', 'Du'],
      description: 'High-speed servers for UAE with DPI evasion'
    },
    bangladesh: {
      name: 'Bangladesh',
      icon: '🇧🇩',
      providers: ['Grameenphone', 'Robi', 'Banglalink', 'Teletalk'],
      description: 'Local telecom packages for unlimited internet'
    },
    palk: {
      name: 'Palk Telecom',
      icon: '🌐',
      providers: ['Palk Telecom'],
      description: 'Special configs for Palk Telecom users'
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      const res = await axios.get(`${API_URL}/info`);
      setRegions(res.data.regions);
    } catch (err) {
      console.error('Error fetching info:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRegionConfigs = async (region) => {
    setSelectedRegion(region);
    try {
      const res = await axios.get(`${API_URL}/configs/regional/${region}`);
      setConfigs(res.data.configs || []);
    } catch (err) {
      console.error('Error fetching configs:', err);
    }
  };

  const copyConfig = async (config, id) => {
    try {
      await navigator.clipboard.writeText(config);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Regional Packages</h1>
          <p className="text-slate-400">Optimized configs for local telecom providers</p>
        </div>

        {!selectedRegion ? (
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(regionInfo).map(([key, info], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ boxShadow: '0 0 35px rgba(168,85,247,0.35)' }}
                onClick={() => fetchRegionConfigs(key)}
                className="p-6 bg-slate-900/35 rounded-3xl border border-slate-800/45 backdrop-blur-xl cursor-pointer relative overflow-hidden"
              >
                <GhostCursor color="#ffffff" brightness={0.8} trailLength={100} bloomStrength={0.04} />
                <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/7 to-white/3 animate-shimmer" />
                <div className="relative z-10">
                  <div className="text-5xl mb-3">{info.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{info.name}</h3>
                  <p className="text-slate-400 mb-3">{info.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {info.providers.map(provider => (
                      <span
                        key={provider}
                        className="px-3 py-1 bg-slate-800/30 rounded-full text-sm border border-slate-700/40"
                      >
                        {provider}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <motion.button
              whileHover={{ boxShadow: '0 0 20px rgba(168,85,247,0.35)' }}
              onClick={() => setSelectedRegion(null)}
              className="mb-6 flex items-center gap-2 px-4 py-2 bg-slate-900/35 rounded-2xl border border-slate-800/45 backdrop-blur-xl text-slate-300 hover:text-white transition-all relative overflow-hidden"
            >
              <GhostCursor color="#ffffff" brightness={0.75} trailLength={95} bloomStrength={0.035} />
              <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/6 to-white/3 animate-shimmer" />
              <div className="relative z-10 flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Back to Regions
              </div>
            </motion.button>

            <div className="mb-8 p-6 bg-slate-900/35 rounded-3xl border border-slate-800/45 backdrop-blur-xl relative overflow-hidden">
              <GhostCursor color="#ffffff" brightness={0.8} trailLength={100} bloomStrength={0.04} />
              <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/7 to-white/3 animate-shimmer" />
              <div className="relative z-10">
                <div className="text-4xl mb-2">{regionInfo[selectedRegion]?.icon}</div>
                <h2 className="text-3xl font-bold mb-2">{regionInfo[selectedRegion]?.name}</h2>
                <p className="text-slate-400">{regionInfo[selectedRegion]?.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {configs.map((cfg, i) => (
                <motion.div
                  key={cfg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5, boxShadow: '0 0 35px rgba(168,85,247,0.35)' }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-slate-900/35 rounded-3xl p-6 border border-slate-800/45 backdrop-blur-xl relative overflow-hidden"
                >
                  <GhostCursor color="#ffffff" brightness={0.75} trailLength={110} bloomStrength={0.03} />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/7 to-white/3 animate-shimmer" />
                  <div className="relative z-10">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl flex items-center justify-center border border-slate-700/40">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{cfg.name || 'Server'}</h3>
                        <span className="text-sm text-slate-400">{cfg.protocol?.toUpperCase() || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-6 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-white" />
                        <span>{cfg.latency || '0'}ms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-white" />
                        <span>DPI Evasion</span>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => copyConfig(cfg.config || '', cfg.id)}
                      whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(168,85,247,0.35)' }}
                      className="w-full py-3 bg-gradient-to-r from-purple-600/85 to-blue-600/85 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 backdrop-blur-xl border border-white/12 relative overflow-hidden"
                    >
                      <GhostCursor color="#ffffff" brightness={0.75} trailLength={115} bloomStrength={0.03} />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/7 to-white/3 animate-shimmer" />
                      <div className="relative z-10 flex items-center justify-center gap-2">
                        {copiedId === cfg.id ? (
                          <>
                            <Check className="w-5 h-5 text-white" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-5 h-5 text-white" />
                            Copy Config
                          </>
                        )}
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {configs.length === 0 && !loading && (
              <div className="text-center py-20 text-slate-400 bg-slate-900/35 rounded-3xl p-8 border border-slate-800/45 backdrop-blur-xl relative overflow-hidden">
                <GhostCursor color="#ffffff" brightness={0.65} trailLength={105} bloomStrength={0.02} />
                <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/6 to-white/3 animate-shimmer" />
                <div className="relative z-10">
                  <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50 text-white" />
                  <p className="text-xl">No configs found for this region</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Regional;
