import { motion } from 'framer-motion';
import { Copy, Check, Download, Share2, RefreshCw, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const ConfigGenerator = () => {
  const [generating, setGenerating] = useState(false);
  const [generatedConfig, setGeneratedConfig] = useState(null);
  const [copied, setCopied] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState('vmess');
  const [selectedRegion, setSelectedRegion] = useState('global');

  const protocols = [
    { id: 'vmess', name: 'VMess', icon: '📡' },
    { id: 'vless', name: 'VLess', icon: '🌐' },
    { id: 'trojan', name: 'Trojan', icon: '🔒' },
    { id: 'tuic', name: 'TUIC', icon: '⚡' },
    { id: 'ss', name: 'Shadowsocks', icon: '🔐' },
    { id: 'hysteria2', name: 'Hysteria2', icon: '🚀' }
  ];

  const regions = [
    { id: 'global', name: 'Global', flag: '🌍' },
    { id: 'ksa', name: 'Saudi Arabia', flag: '🇸🇦' },
    { id: 'uae', name: 'UAE', flag: '🇦🇪' },
    { id: 'bd', name: 'Bangladesh', flag: '🇧🇩' }
  ];

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const config = {
        id: Date.now(),
        protocol: selectedProtocol,
        region: selectedRegion,
        server: `${selectedProtocol}-${selectedRegion}-${Math.random().toString(36).substr(2, 9)}`,
        config: `vmess://${Math.random().toString(36).substr(2, 20)}?ps=${selectedProtocol}&path=/v2/${selectedRegion}&host=cdn.example.com`,
        speed: 'Ultra Fast',
        ping: Math.floor(Math.random() * 50) + 10,
        expiry: '90 days'
      };
      
      setGeneratedConfig(config);
    } catch (error) {
      console.error('Error generating config:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedConfig.config);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
            Generate Configs
          </h2>
          <p className="text-xl text-slate-300">Create custom VPN configurations in seconds</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Config Builder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl" />
            
            <div className="relative bg-gradient-to-br from-slate-900/60 to-slate-950/60 rounded-3xl p-8 border border-slate-700/40 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span>⚙️</span> Configuration Builder
              </h3>

              {/* Protocol Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-300 mb-3">Select Protocol</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {protocols.map(proto => (
                    <motion.button
                      key={proto.id}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedProtocol(proto.id)}
                      className={`relative py-3 rounded-xl font-semibold text-sm transition-all overflow-hidden ${
                        selectedProtocol === proto.id
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 border border-purple-400'
                          : 'bg-slate-800/50 border border-slate-700/40 hover:border-purple-500/40'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer" />
                      <div className="relative flex items-center justify-center gap-1">
                        <span>{proto.icon}</span>
                        <span>{proto.name}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Region Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-300 mb-3">Select Region</label>
                <div className="grid grid-cols-2 gap-2">
                  {regions.map(region => (
                    <motion.button
                      key={region.id}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedRegion(region.id)}
                      className={`relative py-3 rounded-xl font-semibold text-sm transition-all overflow-hidden ${
                        selectedRegion === region.id
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 border border-purple-400'
                          : 'bg-slate-800/50 border border-slate-700/40 hover:border-purple-500/40'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer" />
                      <div className="relative flex items-center justify-center gap-2">
                        <span>{region.flag}</span>
                        <span>{region.name}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={generating}
                className="w-full relative py-4 bg-gradient-to-r from-purple-600/85 to-blue-600/85 rounded-2xl font-bold text-lg text-white border border-white/12 backdrop-blur-xl disabled:opacity-50 transition-all overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <div className="relative flex items-center justify-center gap-2">
                  {generating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      <span>Generate Config</span>
                    </>
                  )}
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Generated Config Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative group"
          >
            {generatedConfig ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-3xl blur-2xl" />
                
                <div className="relative bg-gradient-to-br from-slate-900/60 to-slate-950/60 rounded-3xl p-8 border border-green-500/30 backdrop-blur-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-semibold text-green-400">Config Generated Successfully</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-6">✨ Your Config</h3>

                  {/* Config Details */}
                  <div className="space-y-4 mb-6">
                    {[
                      { label: 'Protocol', value: generatedConfig.protocol.toUpperCase() },
                      { label: 'Region', value: generatedConfig.region.toUpperCase() },
                      { label: 'Server', value: generatedConfig.server },
                      { label: 'Speed', value: generatedConfig.speed },
                      { label: 'Ping', value: `${generatedConfig.ping}ms` },
                      { label: 'Expiry', value: generatedConfig.expiry }
                    ].map((item, i) => (
                      <div key={i} className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/30 backdrop-blur-md">
                        <div className="text-xs text-slate-500 font-semibold mb-1">{item.label}</div>
                        <div className="text-sm font-bold text-slate-200">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Config String */}
                  <div className="mb-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700/30 backdrop-blur-md">
                    <div className="text-xs text-slate-500 font-semibold mb-2">Configuration String</div>
                    <div className="text-xs text-slate-300 font-mono break-all bg-slate-800/30 p-2 rounded-lg overflow-auto max-h-24">
                      {generatedConfig.config}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCopy}
                      className="relative py-3 bg-gradient-to-r from-purple-600/85 to-blue-600/85 rounded-xl font-semibold flex items-center justify-center gap-2 border border-white/12 backdrop-blur-xl overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shimmer" />
                      <div className="relative flex items-center gap-2">
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative py-3 bg-slate-800/50 rounded-xl font-semibold flex items-center justify-center gap-2 border border-slate-700/40 backdrop-blur-xl hover:border-orange-500/40 transition-all overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 animate-shimmer" />
                      <div className="relative flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-700/20 to-slate-600/20 rounded-3xl blur-2xl" />
                
                <div className="relative bg-gradient-to-br from-slate-900/60 to-slate-950/60 rounded-3xl p-8 border border-slate-700/40 backdrop-blur-xl flex flex-col items-center justify-center min-h-96">
                  <AlertCircle className="w-16 h-16 text-slate-500 mb-4 opacity-50" />
                  <p className="text-lg font-semibold text-slate-400 text-center">Generate a config to see it here</p>
                  <p className="text-sm text-slate-500 mt-2 text-center">Select protocol & region, then click generate</p>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ConfigGenerator;
