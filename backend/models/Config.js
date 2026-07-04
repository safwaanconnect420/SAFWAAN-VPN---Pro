import mongoose from 'mongoose';

const configSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  protocol: {
    type: String,
    enum: ['vmess', 'vless', 'trojan', 'tuic', 'ss', 'ssr', 'hysteria2'],
    required: true
  },
  region: String,
  country: String,
  server: String,
  port: Number,
  raw: {
    type: String,
    required: true
  },
  configString: String,
  speed: { type: String, enum: ['slow', 'normal', 'fast', 'ultra'], default: 'normal' },
  latency: { type: Number, default: 0 }, // ms
  bandwidth: Number, // Mbps
  isFree: { type: Boolean, default: true },
  isPremium: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  dpiEvasion: { type: Boolean, default: true },
  encryption: {
    type: { type: String, default: 'AES-256-GCM' },
    strength: { type: Number, default: 256 }
  },
  uptime: { type: Number, default: 99.9 }, // percentage
  users: { type: Number, default: 0 },
  maxUsers: { type: Number, default: 1000 },
  expiry: Date,
  tags: [String],
  category: String,
  source: String,
  stats: {
    connections: { type: Number, default: 0 },
    dataUsed: { type: Number, default: 0 },
    lastUsed: Date
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Config', configSchema);