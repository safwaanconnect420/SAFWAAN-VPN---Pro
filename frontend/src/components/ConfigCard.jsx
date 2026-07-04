import { motion } from 'framer-motion';
import { Copy, Check, Download, Share2, Zap, Shield, Globe } from 'lucide-react';
import { useState } from 'react';

const ConfigCard = ({ config, index, onCopy }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async () => {
    await onCopy(config.raw, config.id);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getProtocolIcon = (protocol) => {
    const icons = {
      vmess: '📡',
      vless: '🌐',
      trojan: '🔒',
      tuic: '⚡',
      ss: '🔐',
      ssr: '🛡️',
      hysteria2: '🚀'
    };
    return icons[protocol?.toLowerCase()] || '📡';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(168, 85, 247, 0.4)' }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300" />
      
      <div className="relative bg-gradient-to-br from-slate-900/60 to-slate-950/60 rounded-3xl p-6 border border-slate-700/40 backdrop-blur-xl overflow-hidden">
        {/* Animated background shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 animate-shimmer" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{getProtocolIcon(config.protocol)}</div>
              <div>
                <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                  {config.protocol?.toUpperCase() || 'CONFIG'}
                </div>
                <div className="text-sm text-slate-400">{config.region?.toUpperCase() || 'Global'}</div>
              </div>
            </div>
            {config.is_premium && (
              <div className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 rounded-full text-xs font-bold text-yellow-300 backdrop-blur-md">
                ⭐ PREMIUM
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-slate-800/30 rounded-2xl border border-slate-700/30 backdrop-blur-md">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span className="text-sm font-semibold text-slate-300">{config.speed || 'Fast'}</span>
              </div>
              <div className="text-xs text-slate-500">Speed</div>
            </div>
            <div className="text-center border-l border-r border-slate-700/30">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Shield className="w-3 h-3 text-green-400" />
                <span className="text-sm font-semibold text-slate-300">Secure</span>
              </div>
              <div className="text-xs text-slate-500">Encryption</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Globe className="w-3 h-3 text-blue-400" />
                <span className="text-sm font-semibold text-slate-300">{config.latency || '10'}ms</span>
              </div>
              <div className="text-xs text-slate-500">Latency</div>
            </div>
          </div>

          {/* Config Preview */}
          <div className="mb-4 p-3 bg-slate-900/40 rounded-2xl border border-slate-700/30 backdrop-blur-md">
            <div className="text-xs text-slate-400 font-mono break-all line-clamp-2 hover:line-clamp-none">
              {config.raw?.substring(0, 80)}...
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopy}
              className="relative py-2 bg-gradient-to-r from-purple-600/85 to-blue-600/85 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 border border-white/12 backdrop-blur-xl group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer" />
              <div className="relative z-10 flex items-center justify-center gap-2">
                {isCopied ? (
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative py-2 bg-slate-800/50 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 border border-slate-700/40 backdrop-blur-xl hover:border-orange-500/40 hover:bg-orange-900/20 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 animate-shimmer" />
              <div className="relative z-10 flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfigCard;
