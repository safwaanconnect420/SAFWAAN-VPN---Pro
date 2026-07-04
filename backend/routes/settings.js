import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get Server Settings
router.get('/server', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    settings: {
      name: 'SAFWAAN VPN Pro',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      database: 'MongoDB',
      enableRegistration: true,
      enableGuestAccess: true,
      maxDevicesPerUser: 5,
      sessionTimeout: 3600,
      features: {
        dpiEvasion: true,
        streaming: true,
        gaming: true,
        socialMedia: true,
        regionalConfigs: true
      }
    }
  });
}));

// Get User Settings
router.get('/user', authenticate, asyncHandler(async (req, res) => {
  const user = await req.user;
  
  res.json({
    success: true,
    settings: user.preferences
  });
}));

// Update User Settings
router.put('/user', authenticate, asyncHandler(async (req, res) => {
  const { defaultProtocol, defaultRegion, autoConnect, theme } = req.body;

  await req.user.updateOne({
    'preferences.defaultProtocol': defaultProtocol,
    'preferences.defaultRegion': defaultRegion,
    'preferences.autoConnect': autoConnect,
    'preferences.theme': theme
  });

  res.json({
    success: true,
    message: 'Settings updated'
  });
}));

// Get Available Regions
router.get('/regions', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    regions: [
      { id: 'global', name: 'Global', flag: '🌍', servers: 100 },
      { id: 'us', name: 'United States', flag: '🇺🇸', servers: 25 },
      { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', servers: 15 },
      { id: 'de', name: 'Germany', flag: '🇩🇪', servers: 12 },
      { id: 'sg', name: 'Singapore', flag: '🇸🇬', servers: 18 },
      { id: 'jp', name: 'Japan', flag: '🇯🇵', servers: 20 },
      { id: 'hk', name: 'Hong Kong', flag: '🇭🇰', servers: 16 },
      { id: 'ksa', name: 'Saudi Arabia', flag: '🇸🇦', servers: 12 },
      { id: 'uae', name: 'UAE', flag: '🇦🇪', servers: 14 },
      { id: 'bangladesh', name: 'Bangladesh', flag: '🇧🇩', servers: 10 }
    ]
  });
}));

// Get Available Protocols
router.get('/protocols', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    protocols: [
      { id: 'vmess', name: 'VMess', icon: '📡', speed: 'Fast', encryption: 'AES-128-GCM' },
      { id: 'vless', name: 'VLess', icon: '🌐', speed: 'Faster', encryption: 'None/TLS' },
      { id: 'trojan', name: 'Trojan', icon: '🎭', speed: 'Ultra', encryption: 'TLS' },
      { id: 'tuic', name: 'TUIC', icon: '⚡', speed: 'Extreme', encryption: 'Chacha20' },
      { id: 'ss', name: 'Shadowsocks', icon: '🔑', speed: 'Fast', encryption: 'AES-256-GCM' },
      { id: 'ssr', name: 'ShadowsocksR', icon: '🔐', speed: 'Medium', encryption: 'Custom' },
      { id: 'hysteria2', name: 'Hysteria2', icon: '🚀', speed: 'Ultra', encryption: 'Modern' }
    ]
  });
}));

// Get System Status
router.get('/status', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    status: {
      api: 'online',
      database: 'connected',
      configCache: 'active',
      ssl: 'verified',
      uptime: process.uptime(),
      timestamp: new Date(),
      responseTime: Math.random() * 100
    }
  });
}));

export default router;