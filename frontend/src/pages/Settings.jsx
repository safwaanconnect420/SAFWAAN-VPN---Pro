import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Cloud, Server, Wifi, Shield, Globe, Save, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
import GhostCursor from '../components/GhostCursor';

const API_URL = 'http://localhost:5000/api';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    backend: false,
    configs: false,
    lastUpdate: null
  });
  const [ociSettings, setOciSettings] = useState({
    tenancyId: '',
    userId: '',
    apiKey: '',
    region: 'us-ashburn-1'
  });

  const freePlatforms = [
    { name: 'Oracle Cloud (OCI) Free Tier', icon: Cloud, status: 'available', description: 'Always-free Ampere A1 compute, 20GB storage, 10TB outbound' },
    { name: 'Render', icon: Globe, status: 'available', description: 'Free web services, static hosting, cron jobs' },
    { name: 'Railway', icon: Server, status: 'available', description: 'Free tier with $5 monthly credit' },
    { name: 'Fly.io', icon: Globe, status: 'available', description: 'Free allowances for apps and databases' },
    { name: 'GitHub Actions', icon: Server, status: 'active', description: 'Auto-update configs via GitHub' }
  ];

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      const res = await axios.get(`${API_URL}/health`);
      setStatus(prev => ({ ...prev, backend: true }));
    } catch (err) {
      setStatus(prev => ({ ...prev, backend: false }));
    }
  };

  const triggerUpdate = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/configs/update`);
      setStatus(prev => ({ ...prev, configs: true, lastUpdate: new Date().toLocaleString() }));
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveOciSettings = () => {
    localStorage.setItem('ociSettings', JSON.stringify(ociSettings));
    alert('OCI settings saved!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <SettingsIcon className="w-10 h-10 text-white" />
            <h1 className="text-4xl font-bold">Settings</h1>
          </div>
          <p className="text-slate-400">Configure your VPN manager and connect to cloud platforms</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <motion.div
              whileHover={{ boxShadow: '0 0 35px rgba(168,85,247,0.35)' }}
              className="bg-slate-900/35 rounded-3xl p-8 border border-slate-800/45 mb-8 backdrop-blur-xl relative overflow-hidden"
            >
              <GhostCursor color="#ffffff" brightness={0.8} trailLength={100} bloomStrength={0.04} />
              <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/7 to-white/3 animate-shimmer" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-white" />
                  System Status
                </h2>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-slate-800/30 rounded-2xl border border-slate-700/40 backdrop-blur-md relative overflow-hidden">
                    <GhostCursor color="#ffffff" brightness={0.75} trailLength={95} bloomStrength={0.035} />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/6 to-white/3 animate-shimmer" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300">Backend API</span>
                        {status.backend ? (
                          <div className="flex items-center gap-2 text-green-300">
                            <CheckCircle className="w-4 h-4" />
                            <span>Online</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-300">
                            <AlertCircle className="w-4 h-4" />
                            <span>Offline</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-800/30 rounded-2xl border border-slate-700/40 backdrop-blur-md relative overflow-hidden">
                    <GhostCursor color="#ffffff" brightness={0.75} trailLength={95} bloomStrength={0.035} />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/6 to-white/3 animate-shimmer" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300">Configs Updated</span>
                        {status.lastUpdate && (
                          <span className="text-green-300 text-sm">{status.lastUpdate}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(168,85,247,0.35)' }}
                  onClick={triggerUpdate}
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600/85 to-blue-600/85 disabled:opacity-50 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center gap-2 backdrop-blur-xl border border-white/12 relative overflow-hidden"
                >
                  <GhostCursor color="#ffffff" brightness={1.25} trailLength={48} bloomStrength={0.11} />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/7 to-white/3 animate-shimmer" />
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Updating Configs...
                      </>
                    ) : (
                      <>
                        <Wifi className="w-5 h-5 text-white" />
                        Update Configurations
                      </>
                    )}
                  </div>
                </motion.button>
              </div>
            </motion.div>

            {/* Free Platforms */}
            <motion.div
              whileHover={{ boxShadow: '0 0 35px rgba(168,85,247,0.35)' }}
              className="bg-slate-900/35 rounded-3xl p-8 border border-slate-800/45 backdrop-blur-xl relative overflow-hidden"
            >
              <GhostCursor color="#ffffff" brightness={0.8} trailLength={100} bloomStrength={0.04} />
              <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/7 to-white/3 animate-shimmer" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Cloud className="w-6 h-6 text-white" />
                  Free Cloud Platforms
                </h2>

                <div className="space-y-4">
                  {freePlatforms.map((platform, i) => (
                    <motion.div
                      key={platform.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(168,85,247,0.25)' }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 bg-slate-800/30 rounded-2xl border border-slate-700/40 transition-all backdrop-blur-md relative overflow-hidden"
                    >
                      <GhostCursor color="#ffffff" brightness={0.75} trailLength={95} bloomStrength={0.035} />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/6 to-white/3 animate-shimmer" />
                      <div className="relative z-10">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-600/85 to-blue-600/85 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-xl border border-white/15 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/7 to-white/3 animate-shimmer" />
                            <div className="relative z-10">
                              <platform.icon className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-lg">{platform.name}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                platform.status === 'active' ? 'bg-green-900/30 text-green-300 border border-green-700/40' : 'bg-blue-900/30 text-blue-300 border border-blue-700/40'
                              }`}>
                                {platform.status.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-slate-400 text-sm">{platform.description}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* OCI Config */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <motion.div
              whileHover={{ boxShadow: '0 0 35px rgba(168,85,247,0.35)' }}
              className="bg-slate-900/35 rounded-3xl p-8 border border-slate-800/45 sticky top-24 backdrop-blur-xl relative overflow-hidden"
            >
              <GhostCursor color="#ffffff" brightness={0.8} trailLength={100} bloomStrength={0.04} />
              <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/7 to-white/3 animate-shimmer" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Cloud className="w-6 h-6 text-white" />
                  OCI Configuration
                </h2>
                <p className="text-slate-400 text-sm mb-6">Connect to Oracle Cloud Free Tier for always-free resources</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Tenancy ID</label>
                    <input
                      type="text"
                      value={ociSettings.tenancyId}
                      onChange={(e) => setOciSettings(prev => ({ ...prev, tenancyId: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-800/35 border border-slate-700/40 rounded-2xl focus:outline-none focus:border-purple-500/60 transition-all backdrop-blur-md"
                      placeholder="ocid1.tenancy.oc1..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">User ID</label>
                    <input
                      type="text"
                      value={ociSettings.userId}
                      onChange={(e) => setOciSettings(prev => ({ ...prev, userId: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-800/35 border border-slate-700/40 rounded-2xl focus:outline-none focus:border-purple-500/60 transition-all backdrop-blur-md"
                      placeholder="ocid1.user.oc1..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Region</label>
                    <select
                      value={ociSettings.region}
                      onChange={(e) => setOciSettings(prev => ({ ...prev, region: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-800/35 border border-slate-700/40 rounded-2xl focus:outline-none focus:border-purple-500/60 transition-all backdrop-blur-md"
                    >
                      <option value="us-ashburn-1">US East (Ashburn)</option>
                      <option value="us-phoenix-1">US West (Phoenix)</option>
                      <option value="eu-frankfurt-1">EU (Frankfurt)</option>
                      <option value="uk-london-1">UK (London)</option>
                      <option value="me-jeddah-1">Middle East (Jeddah)</option>
                      <option value="ap-mumbai-1">Asia Pacific (Mumbai)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">API Key (PEM)</label>
                    <textarea
                      value={ociSettings.apiKey}
                      onChange={(e) => setOciSettings(prev => ({ ...prev, apiKey: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-800/35 border border-slate-700/40 rounded-2xl focus:outline-none focus:border-purple-500/60 transition-all resize-none backdrop-blur-md"
                      placeholder="-----BEGIN PUBLIC KEY-----"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(255,165,0,0.35)' }}
                    onClick={saveOciSettings}
                    className="w-full py-3 bg-gradient-to-r from-orange-600/85 to-red-600/85 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 backdrop-blur-xl border border-white/12 relative overflow-hidden"
                  >
                    <GhostCursor color="#ffffff" brightness={0.78} trailLength={108} bloomStrength={0.035} />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/7 to-white/3 animate-shimmer" />
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      <Save className="w-5 h-5 text-white" />
                      Save OCI Settings
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
