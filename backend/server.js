import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import configRoutes from './routes/configs.js';
import userRoutes from './routes/users.js';
import settingsRoutes from './routes/settings.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logRequests } from './middleware/logger.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(logRequests);

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/safwaan-vpn')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/configs', configRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingsRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Info Endpoint
app.get('/api/info', (req, res) => {
  res.json({
    version: '1.0.0',
    name: 'SAFWAAN VPN Pro',
    description: 'Ultimate VPN Configuration Manager',
    regions: ['global', 'ksa', 'uae', 'bangladesh', 'uk', 'us', 'sg', 'jp', 'de', 'hk'],
    protocols: ['vmess', 'vless', 'trojan', 'tuic', 'ss', 'ssr', 'hysteria2'],
    features: ['DPI Evasion', 'Fast Servers', 'Military Encryption', 'Mobile Support']
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 SAFWAAN VPN Backend Running on http://localhost:${PORT}`);
  console.log(`📊 API Base URL: http://localhost:${PORT}/api`);
  console.log(`🔗 Frontend: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`🗄️  Database: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/safwaan-vpn'}\n`);
});

export default app;