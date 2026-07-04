import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Server, Wifi, Clock, Copy, Check, AlertCircle } from 'lucide-react';
import axios from 'axios';
import GhostCursor from '../components/GhostCursor';

const API_URL = 'http://localhost:5000/api';

const RefreshIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const Servers = () => {
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}/configs`);
      setConfigs(res.data.configs || []);
    } catch (err) {
      console.error('Error fetching configs:', err);
      setError('Backend server unavailable. Please start backend at http://localhost:5000');
    } finally {
      setLoading(false);
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

  const filteredConfigs = configs.filter(cfg => {
    const matchesSearch = cfg.name?.toLowerCase().includes(search.toLowerCase());
    const matchesProtocol = selectedProtocol === 'all' || cfg.protocol?.toLowerCase() === selectedProtocol;
    return matchesSearch && matchesProtocol;
  });

  const protocols = ['all', 'vmess', 'vless', 'trojan', 'tuic', 'ss', 'ssr', 'hysteria2'];

  const getProtocolColor = (protocol) => {
    const colors = {
      vmess: 'bg-blue-500',
      vless: 'bg-green-500',
      trojan: 'bg-purple-500',
      tuic: 'bg-orange-500',
      ss: 'bg-cyan-500',
      ssr: 'bg-pink-500',
      hysteria2: 'bg-yellow-500'
    };
    return colors[protocol?.toLowerCase()] || 'bg-slate-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Server List</h1>
            <p className="text-slate-400">Browse and connect to premium VPN servers</p>
          </div>
          <motion.button
            onClick={fetchConfigs}
            whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(168,85,247,0.35)' }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600/85 to-blue-600/85 rounded-2xl font-semibold transition-all backdrop-blur-xl border border-white/12 relative overflow-hidden"
          >
            <GhostCursor color="#ffffff" brightness={0.75} trailLength={110} bloomStrength={0.03} />
            <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/7 to-white/3 animate-shimmer" />
            <div className="relative z-10 flex items-center gap-2">
              <RefreshIcon /> Refresh
            </div>
          </motion.button>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ boxShadow: '0 0 35px rgba(239,68,68,0.35)' }}
            className="mb-8 p-6 bg-red-900/25 border border-red-500/40 rounded-3xl flex items-center gap-4 backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/6 to-white/3 animate-shimmer" />
            <div className="relative z-10 flex items-center gap-4">
              <AlertCircle className="w-10 h-10 text-red-300 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-red-200">Backend Connection Error</h3>
                <p className="text-slate-300 mt-2">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <div className="bg-slate-900/25 rounded-3xl p-6 mb-8 border border-slate-800/40 backdrop-blur-xl relative overflow-hidden">
          <GhostCursor color="#ffffff" brightness={0.65} trailLength={105} bloomStrength={0.02} />
          <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/7 to-white/3 animate-shimmer" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                <input
                  type="text"
                  placeholder="Search servers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/35 border border-slate-700/40 rounded-2xl focus:outline-none focus:border-purple-500/60 transition-all backdrop-blur-md"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {protocols.map(proto => (
                  <motion.button
                    key={proto}
                    whileHover={{ scale: 1.05, boxShadow: selectedProtocol === proto ? '0 0 25px rgba(168,85,247,0.35)' : '0 0 15px rgba(148,163,184,0.25)' }}
                    onClick={() => setSelectedProtocol(proto)}
                    className={`px-4 py-2 rounded-2xl font-medium whitespace-nowrap transition-all relative overflow-hidden ${
                      selectedProtocol === proto
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-slate-800/35 text-slate-300 hover:bg-slate-700/50 backdrop-blur-md border border-slate-700/40'
                    }`}
                  >
                    <GhostCursor color="#ffffff" brightness={0.6} trailLength={100} bloomStrength={0.02} />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/6 to-white/3 animate-shimmer" />
                    <div className="relative z-10">{proto.toUpperCase()}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Server List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConfigs.map((cfg, i) => (
              <motion.div
                key={cfg.id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, boxShadow: '0 0 35px rgba(168,85,247,0.35)' }}
                transition={{ delay: i * 0.05 }}
                className="bg-slate-900/30 rounded-3xl p-6 border border-slate-800/45 backdrop-blur-xl relative overflow-hidden"
              >
                <GhostCursor color="#ffffff" brightness={0.75} trailLength={110} bloomStrength={0.03} />
                <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/7 to-white/3 animate-shimmer" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${getProtocolColor(cfg.protocol)} flex items-center justify-center border border-white/20`}>
                        <Server className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{cfg.name || 'Server'}</h3>
                        <span className="text-sm text-slate-400">{cfg.region?.toUpperCase() || 'N/A'}</span>
                      </div>
                    </div>
                    {cfg.is_regional && (
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs font-semibold border border-white/20">
                        REGIONAL
                      </span>
                    )}
                    {cfg.is_social && (
                      <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-xs font-semibold border border-white/20">
                        SOCIAL
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-6 mb-6 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-white" />
                      <span>{cfg.latency || '0'}ms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-white" />
                      <span>Updated</span>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => copyConfig(cfg.config || '', cfg.id)}
                    whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(168,85,247,0.35)' }}
                    className="w-full py-3 bg-gradient-to-r from-purple-600/85 to-blue-600/85 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 backdrop-blur-xl border border-white/12 relative overflow-hidden"
                  >
                    <GhostCursor color="#ffffff" brightness={0.7} trailLength={115} bloomStrength={0.03} />
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
        )}

        {!loading && filteredConfigs.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <Server className="w-16 h-16 mx-auto mb-4 opacity-50 text-white" />
            <p className="text-xl">No servers found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Servers;
