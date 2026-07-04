
<div align="center">
  <h1>🚀 SAFWAAN VPN - Ultimate VPN Config Manager</h1>
  <p><strong>The most advanced, feature-packed VPN configuration suite for free, unlimited internet access</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Made_with-❤️-ff69b4" />
    <img src="https://img.shields.io/badge/Python-3.8+-blue" />
    <img src="https://img.shields.io/badge/React-19-purple" />
    <img src="https://img.shields.io/badge/Flask-API-green" />
    <img src="https://img.shields.io/badge/Three.js-Animations-yellow" />
  </p>
</div>

---

## 🌟 Why SAFWAAN VPN?

Say goodbye to internet restrictions with **SAFWAAN VPN**—the ultimate, all-in-one VPN configuration manager that combines cutting-edge technology, beautiful UI/UX, and thousands of free, auto-updating servers! Whether you're looking to bypass censorship, access blocked content, or use your social data packages for full internet access—SAFWAAN VPN has you covered!

---

## ✨ Advanced Features That Set Us Apart

### 🎨 Stunning, Premium UI/UX
- **Framer Motion Animations**: Smooth, eye-catching transitions and micro-interactions
- **MagicRings Hero Background**: Interactive, animated rings that follow your cursor
- **GhostCursor Custom Cursor**: Beautiful, smoky custom cursor with bloom effects and grain
- **Responsive Design**: Perfectly optimized for desktop, tablet, and mobile devices
- **Dark/Light Ready**: Clean dark theme (light theme support coming soon!)
- **Protocol Distribution Chart**: Visualize server protocols with Recharts pie chart

### 🛠️ Powerful Backend Engine
- **Flask REST API**: Robust, production-ready API server for config management
- **Auto-Update Configs**: Automatically fetch and refresh VPN configs from multiple trusted sources
- **Protocol Splitter**: Organize configs by protocol (VMess, VLess, Trojan, TUIC, Shadowsocks, Hysteria2)
- **Smart Caching**: Lightning-fast responses with in-memory config caching
- **CORS Enabled**: Easy integration with any frontend

### 🌍 Global & Regional Coverage
- **Thousands of Free Servers**: Access configs from all around the world
- **Social Media Masking**: Optimized servers for Facebook, Instagram, YouTube, TikTok, Twitter/X, WhatsApp, Telegram—use your social data packages for full internet access!
- **Regional Telecom Packages**: Pre-configured configs for:
  - 🇸🇦 KSA: Salam, STC, Zain, Mobily
  - 🇦🇪 UAE/Dubai: Etisalat, Du
  - 🇧🇩 Bangladesh: Grameenphone, Robi, Banglalink, Teletalk
  - 🌐 Palk Telecom
- **DPI Evasion**: Advanced payloads to bypass deep packet inspection

### 📱 Multi-Protocol Support
- ✅ VMess
- ✅ VLess
- ✅ Trojan
- ✅ TUIC
- ✅ Shadowsocks (SS)
- ✅ ShadowsocksR (SSR)
- ✅ Hysteria2

---

## � Quick Start

### Prerequisites
- Node.js 18+
- Python 3.8+
- pip

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python server.py
```
Backend is running at http://localhost:5000!

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173 in your browser!

---

## 📁 Project Architecture

```
SAFWAAN-VPN/
├── backend/                          # Flask API & Config Engine
│   ├── server.py                     # REST API server
│   ├── app.py                        # Config fetcher & updater
│   ├── sort.py                       # Protocol splitter
│   └── requirements.txt              # Dependencies
├── frontend/                         # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Navigation
│   │   │   ├── MagicRings.jsx        # Animated hero background
│   │   │   ├── GhostCursor.jsx       # Custom cursor effect
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Homepage with hero & chart
│   │   │   ├── Servers.jsx           # Server list & filtering
│   │   │   ├── Regional.jsx          # Regional telecom packages
│   │   │   └── Settings.jsx          # App settings
│   └── package.json
├── .github/workflows/main.yml        # Auto-update config workflow
├── Base64/                           # Base64 encoded configs
├── Splitted-By-Protocol/             # Protocol-split configs
└── README.md
```

---

##  API Documentation

### Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| GET | /api/configs | Get all configs with optional filters |
| GET | /api/configs/protocol/:protocol | Get configs by protocol |
| GET | /api/configs/category/:category | Get configs by category |
| GET | /api/configs/regional/:region | Get configs by region |
| POST | /api/configs/update | Trigger config update |
| GET | /api/info | Get app info |

---

## ☁️ Deployment Guide

### Option 1: GitHub Actions (Free Auto-Update)
Just fork the repo and enable GitHub Actions—configs will auto-update!

### Option 2: Oracle Cloud Free Tier (Always-Free)
1. Sign up for OCI Free Tier
2. Create an Ampere A1 VM (4 OCPUs, 24GB RAM, always-free!)
3. SSH in and run backend
4. Use OCI Object Storage for config hosting

### Option 3: Render
Deploy frontend to Render (static site) and backend as a web service!

### Option 4: Railway
$5 free credit monthly—perfect for hosting!

---

## � Compatible VPN Clients

- Android: v2rayNG, Hiddify Next
- iOS: Fair VPN, Streisand
- Windows/macOS/Linux: Hiddify Next, Nekoray, v2rayN

---

## 🤝 Contributing

We love contributions! Feel free to:
- Fork the repo
- Make improvements
- Submit PRs

---

## 📄 License

MIT

---

<div align="center">
  <p>Built with ❤️ for a free and open internet</p>
  <p>Made by SAFWAAN</p>
</div>
