import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import GhostCursor from './components/GhostCursor';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Regional from './pages/Regional';
import Servers from './pages/Servers';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 relative">
        <GhostCursor
          color="#ffffff"
          brightness={0.7}
          edgeIntensity={0}
          trailLength={120}
          inertia={0.5}
          grainIntensity={0.05}
          bloomStrength={0.04}
          bloomRadius={1.0}
          bloomThreshold={0.0}
          fadeDelayMs={2000}
          fadeDurationMs={2500}
        />
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servers" element={<Servers />} />
            <Route path="/regional" element={<Regional />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
