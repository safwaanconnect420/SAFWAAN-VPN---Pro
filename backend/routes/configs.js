import express from 'express';
import axios from 'axios';
import Config from '../models/Config.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Sample VPN Configs Database
const sampleConfigs = [
  {
    name: 'US Fast Server',
    protocol: 'vmess',
    region: 'us',
    country: 'United States',
    speed: 'ultra',
    latency: 12,
    bandwidth: 950,
    raw: 'vmess://eyJhZGQiOiJ1cy5zYWZ3YWFuLmNvbSIsImFpZCI6MCwiaG9zdCI6IiIsImlkIjoiZDMwN2ZmOTItZmQ3Yi00OGJkLWE4MzAtN2I4ZWIyOWUwNGY0IiwibmV0Ijoid3MiLCJwYXRoIjoiL3YycmF5IiwicG9ydCI6NDQzLCJwcyI6IlVTIEZhc3QgU2VydmVyIiwidGxzIjoidGxzIiwidHlwZSI6Im5vbmUifQ==',
    dpiEvasion: true,
    uptime: 99.95,
    tags: ['fast', 'streaming', 'browsing']
  },
  {
    name: 'UK Premium',
    protocol: 'vless',
    region: 'uk',
    country: 'United Kingdom',
    speed: 'fast',
    latency: 25,
    bandwidth: 850,
    raw: 'vless://d307ff92-fd7b-48bd-a830-7b8eb29e04f4@uk.safwaan.com:443?path=%2Fvless&security=tls&encryption=none&type=ws',
    dpiEvasion: true,
    uptime: 99.85,
    tags: ['stable', 'premium'],
    isPremium: true
  },
  {
    name: 'SG Lightning',
    protocol: 'trojan',
    region: 'sg',
    country: 'Singapore',
    speed: 'ultra',
    latency: 18,
    bandwidth: 900,
    raw: 'trojan://safwaan-secret@sg.safwaan.com:443?sni=sg.safwaan.com&allowInsecure=1',
    dpiEvasion: true,
    uptime: 99.9,
    tags: ['asia', 'fast', 'streaming']
  },
  {
    name: 'JP Gaming',
    protocol: 'tuic',
    region: 'jp',
    country: 'Japan',
    speed: 'ultra',
    latency: 8,
    bandwidth: 980,
    raw: 'tuic://token123456@jp.safwaan.com:443?congestion_control=bbr&udp_relay_mode=native&alpn=h3',
    dpiEvasion: true,
    uptime: 99.88,
    tags: ['gaming', 'low-latency', 'ultra-fast']
  },
  {
    name: 'HK Secure',
    protocol: 'ss',
    region: 'hk',
    country: 'Hong Kong',
    speed: 'fast',
    latency: 22,
    bandwidth: 920,
    raw: 'ss://aes-256-gcm:password123@hk.safwaan.com:8388?obfs=http&obfs-host=cdn.example.com',
    dpiEvasion: true,
    uptime: 99.92,
    tags: ['stable', 'secure']
  },
  {
    name: 'DE Europe Hub',
    protocol: 'hysteria2',
    region: 'de',
    country: 'Germany',
    speed: 'ultra',
    latency: 30,
    bandwidth: 850,
    raw: 'hysteria2://auth-token@de.safwaan.com:443?insecure=1&sni=de.safwaan.com',
    dpiEvasion: true,
    uptime: 99.87,
    tags: ['europe', 'stable']
  },
  {
    name: 'KSA Social',
    protocol: 'vmess',
    region: 'ksa',
    country: 'Saudi Arabia',
    speed: 'fast',
    latency: 35,
    bandwidth: 800,
    raw: 'vmess://eyJhZGQiOiJzYS5zYWZ3YWFuLmNvbSIsImFpZCI6MCwiZXZwbCI6InNoYWsyNTYiLCJob3N0IjoiY2RuLnNhZndlYWEuY29tIiwiaWQiOiJkMzA3ZmY5Mi1mZDdiLTQ4YmQtYTgzMC03YjhlYjI5ZTA0ZjQiLCJuZXQiOiJ3cyIsInBhdGgiOiIvc29jaWFsIiwicG9ydCI6NDQzLCJwcyI6IktTQSBTb2NpYWwiLCJ0bHMiOiJ0bHMiLCJ0eXBlIjoibm9uZSJ9',
    dpiEvasion: true,
    uptime: 99.8,
    tags: ['middle-east', 'social-media', 'facebook', 'instagram'],
    category: 'social'
  },
  {
    name: 'UAE Streaming',
    protocol: 'vless',
    region: 'uae',
    country: 'United Arab Emirates',
    speed: 'ultra',
    latency: 15,
    bandwidth: 960,
    raw: 'vless://abc123def456@ae.safwaan.com:443?path=%2Fstreaming&security=tls&encryption=none&type=ws&sni=ae.safwaan.com',
    dpiEvasion: true,
    uptime: 99.93,
    tags: ['middle-east', 'streaming', 'youtube'],
    category: 'streaming'
  },
  {
    name: 'BD Unlimited',
    protocol: 'trojan',
    region: 'bangladesh',
    country: 'Bangladesh',
    speed: 'fast',
    latency: 45,
    bandwidth: 780,
    raw: 'trojan://bd-secret@bd.safwaan.com:443?sni=bd.safwaan.com&allowInsecure=1',
    dpiEvasion: true,
    uptime: 99.75,
    tags: ['south-asia', 'grameenphone', 'robi'],
    category: 'regional'
  }
];

// Get All Configs
router.get('/', asyncHandler(async (req, res) => {
  const { protocol, region, search } = req.query;
  
  let query = {};
  if (protocol) query.protocol = protocol.toLowerCase();
  if (region) query.region = region.toLowerCase();
  if (search) query.$or = [
    { name: { $regex: search, $options: 'i' } },
    { country: { $regex: search, $options: 'i' } },
    { tags: { $regex: search, $options: 'i' } }
  ];

  let configs = await Config.find(query).limit(50);
  
  // If no configs in DB, return sample data
  if (configs.length === 0) {
    configs = sampleConfigs;
  }

  res.json({
    success: true,
    count: configs.length,
    configs
  });
}));

// Get Config by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const config = await Config.findById(req.params.id);
  
  if (!config) {
    return res.status(404).json({ error: 'Config not found' });
  }

  res.json({ success: true, config });
}));

// Get Regional Configs
router.get('/regional/:region', asyncHandler(async (req, res) => {
  const { region } = req.params;
  
  let configs = await Config.find({ region: region.toLowerCase() });
  
  if (configs.length === 0) {
    configs = sampleConfigs.filter(c => c.region === region.toLowerCase());
  }

  res.json({
    success: true,
    region,
    count: configs.length,
    configs
  });
}));

// Create Config (Admin)
router.post('/', authenticate, asyncHandler(async (req, res) => {
  const { name, protocol, region, raw } = req.body;

  if (!name || !protocol || !raw) {
    return res.status(400).json({ error: 'Name, protocol, and raw config are required' });
  }

  const config = new Config({
    userId: req.userId,
    name,
    protocol,
    region,
    raw,
    isActive: true
  });

  await config.save();

  res.status(201).json({
    success: true,
    message: 'Config created',
    config
  });
}));

// Update Config
router.put('/:id', authenticate, asyncHandler(async (req, res) => {
  let config = await Config.findById(req.params.id);

  if (!config) {
    return res.status(404).json({ error: 'Config not found' });
  }

  config = await Config.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.json({
    success: true,
    message: 'Config updated',
    config
  });
}));

// Delete Config
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
  const config = await Config.findByIdAndDelete(req.params.id);

  if (!config) {
    return res.status(404).json({ error: 'Config not found' });
  }

  res.json({
    success: true,
    message: 'Config deleted'
  });
}));

// Fetch & Update Configs from External Source
router.post('/update', asyncHandler(async (req, res) => {
  try {
    const response = await axios.get(process.env.VPN_CONFIG_API || 'https://raw.githubusercontent.com/mahdibland/V2RayCSV/master/all.csv');
    // Process configs...
    
    res.json({
      success: true,
      message: 'Configs updated successfully',
      count: 0 // Update this based on actual count
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch configs',
      details: error.message
    });
  }
}));

export default router;