import React, { useEffect, useRef } from 'react';

const GhostCursor = ({
  color = '#ffffff',
  brightness = 0.7,
  edgeIntensity = 0,
  trailLength = 120,
  inertia = 0.5,
  grainIntensity = 0.05,
  bloomStrength = 0.04,
  bloomRadius = 1.0,
  bloomThreshold = 0.0,
  fadeDelayMs = 2000,
  fadeDurationMs = 2500
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const trail = [];
    let mouseX = 0;
    let mouseY = 0;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      trail.push({
        x: mouseX,
        y: mouseY,
        timestamp: Date.now()
      });

      if (trail.length > trailLength) {
        trail.shift();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();

      trail.forEach((point, index) => {
        const age = now - point.timestamp;
        const alpha = Math.max(0, 1 - age / (fadeDelayMs + fadeDurationMs));

        if (alpha > 0) {
          const size = (index / trail.length) * 8;
          ctx.fillStyle = `rgba(${parseInt(color.replace('#', '').slice(0, 2), 16)}, ${parseInt(color.replace('#', '').slice(2, 4), 16)}, ${parseInt(color.replace('#', '').slice(4, 6), 16)}, ${alpha * brightness})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [color, brightness, trailLength, fadeDelayMs, fadeDurationMs]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-40"
      style={{ opacity: 0.8 }}
    />
  );
};

export default GhostCursor;
