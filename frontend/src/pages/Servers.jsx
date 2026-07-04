import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Server, Copy, Check, AlertCircle, RefreshCw, Zap } from 'lucide-react';
import axios from 'axios';
import GhostCursor from '../components/GhostCursor';
import ConfigCard from '../components/ConfigCard';
import SmokeEffect from '../components/SmokeEffect';

const API_URL = 'http://localhost:5000/api';

const Servers = () => {
  const [configs, setConfigs] = useState([
    { id: 1, name: 'Server 1', protocol: 'vmess', region: 'us', speed: 'Ultra', latency: 12, raw: 'vmess://eyJhZGQiOiIxOTIuMTY4LjEuMSIsImFpZCI6MCwiaG9zdCI6IiIsImlkIjoiZDMwN2ZmOTItZmQ3Yi00OGJkLWE4MzAtN2I4ZWIyOWUwNGY0IiwibmV0Ijoid3MiLCJwYXRoIjoiL3YycmF5IiwicG9ydCI6NDQzLCJwcyI6IlVTIFNlcnZlciIsInRscyI6InRscyIsInR5cGUiOiJub25lIn0=' },
    { id: 2, name: 'Server 2', protocol: 'vless', region: 'uk', speed: 'Fast', latency: 25, raw: 'vless://d307ff92-fd7b-48bd-a830-7b8eb29e04f4@192.168.1.2:443?path=%2Fv2ray' },
    { id: 3, name: 'Server 3', protocol: 'trojan', region: 'sg', speed: 'Ultra', latency: 18, raw: 'trojan://password@192.168.1.3:443?sni=example.com' },
    { id: 4, name: 'Server 4', protocol: 'tuic', region: 'jp', speed: 'Extreme', latency: 8, raw: 'tuic://token@192.168.1.4:443' },
    { id: 5, name: 'Server 5', protocol: 'ss', region: 'hk', speed: 'Fast', latency: 22, raw: 'ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ@192.168.1.5:8388' },
    { id: 6, name: 'Server 6', protocol: 'hysteria2', region: 'de', speed: 'Ultra', latency: 30, raw: 'hysteria2://auth@192.168.1.6:443?insecure=1' }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  const fetchConfigs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}/configs`);
      setConfigs(res.data.configs || []);
    } catch (err) {
      console.error('Error fetching configs:', err);
      setError('Backend server unavailable');
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
    const matchesSearch = cfg.name?.toLowerCase().includes(search.toLowerCase()) || cfg.region?.toLowerCase().includes(search.toLowerCase());
    const matchesProtocol = selectedProtocol === 'all' || cfg.protocol?.toLowerCase() === selectedProtocol;
    return matchesSearch && matchesProtocol;
  });

  const protocols = ['all', 'vmess', 'vless', 'trojan', 'tuic', 'ss', 'hysteria2'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <SmokeEffect intensity={0.4} />

      <div className="relative z-10 pt-32 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4"
          >
            <div>
              <h1 className="text-5xl md:text-6xl font-black mb-2 text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">Server List</h1>
              <p className="text-slate-400 text-lg">Access premium VPN servers worldwide</p>
            </div>
            <motion.button
              onClick={fetchConfigs}
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600/85 to-blue-600/85 rounded-2xl font-bold transition-all backdrop-blur-xl border border-white/12 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <div className="relative flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                <span>Refresh</span>
              </div>
            </motion.button>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 bg-red-900/25 border border-red-500/40 rounded-3xl flex items-center gap-4 backdrop-blur-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 animate-shimmer" />
              <div className="relative z-10 flex items-center gap-4">
                <AlertCircle className="w-10 h-10 text-red-300 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-red-200">Connection Error</h3>
                  <p className="text-slate-300 mt-1">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative group mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-3xl blur-xl" />
            
            <div className="relative bg-slate-900/50 rounded-3xl p-6 border border-slate-700/40 backdrop-blur-xl">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search servers or regions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/40 rounded-2xl focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all backdrop-blur-md text-white placeholder-slate-400"
                  />
                </div>

                {/* Protocol Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                  {protocols.map(proto => (
                    <motion.button
                      key={proto}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedProtocol(proto)}
                      className={`px-4 py-2 rounded-2xl font-semibold text-sm whitespace-nowrap transition-all relative overflow-hidden ${
                        selectedProtocol === proto
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 border border-purple-400 shadow-lg shadow-purple-500/50'
                          : 'bg-slate-800/50 border border-slate-700/40 hover:border-purple-500/40 hover:bg-slate-700/30'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer" />
                      <div className="relative">{proto.toUpperCase()}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Server List */}
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-16 h-16 border-4 border-purple-500 border-t-blue-500 rounded-full"
              />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConfigs.map((cfg, i) => (
                <ConfigCard
                  key={cfg.id}
                  config={cfg}
                  index={i}
                  onCopy={copyConfig}
                />
              ))}
            </div>
          )}

          {!loading && filteredConfigs.length === 0 && (
            <div className="text-center py-32">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Server className="w-20 h-20 mx-auto mb-4 text-slate-500" />
              </motion.div>
              <p className="text-2xl font-bold text-slate-400">No servers found</p>
              <p className="text-slate-500 mt-2">Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Servers;
