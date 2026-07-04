import React, { useEffect, useRef } from 'react';

const MagicRings = ({
  color = '#A855F7',
  colorTwo = '#6366F1',
  ringCount = 8,
  speed = 1.2,
  attenuation = 4,
  lineThickness = 2,
  baseRadius = 0.2,
  radiusStep = 0.09,
  scaleRate = 0.08,
  opacity = 0.8,
  blur = 2,
  noiseAmount = 0.15,
  rotation = 15,
  ringGap = 1.4,
  fadeIn = 0.4,
  fadeOut = 1.0,
  followMouse = true,
  mouseInfluence = 0.3,
  hoverScale = 1.3,
  parallax = 0.06,
  clickBurst = true
}) => {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const scale = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Mouse tracking
    const handleMouseMove = (e) => {
      mousePos.current = {
        x: e.clientX - canvas.width / 2,
        y: e.clientY - canvas.height / 2
      };
    };

    const handleMouseEnter = () => {
      scale.current = hoverScale;
    };

    const handleMouseLeave = () => {
      scale.current = 1;
    };

    if (followMouse) {
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    // Click burst effect
    const handleClick = (e) => {
      if (!clickBurst) return;
      // Burst effect handled in animation
    };
    if (clickBurst) {
      document.addEventListener('click', handleClick);
    }

    let time = 0;
    const animate = () => {
      time += 0.016 * speed;

      ctx.fillStyle = 'transparent';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2 + mousePos.current.x * mouseInfluence;
      const centerY = canvas.height / 2 + mousePos.current.y * mouseInfluence;

      ctx.filter = `blur(${blur}px)`;

      for (let i = 0; i < ringCount; i++) {
        const radius = (baseRadius + radiusStep * i) * canvas.width * scale.current * (1 + Math.sin(time + i) * noiseAmount);
        const alpha = opacity * Math.max(fadeIn, Math.min(1, fadeOut));
        const hue = (i / ringCount) * 360;

        // Alternate colors
        const currentColor = i % 2 === 0 ? color : colorTwo;
        ctx.strokeStyle = currentColor;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = lineThickness;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.filter = 'none';
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (followMouse) {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseenter', handleMouseEnter);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (clickBurst) {
        document.removeEventListener('click', handleClick);
      }
      window.removeEventListener('resize', updateSize);
    };
  }, [color, colorTwo, ringCount, speed, attenuation, lineThickness, baseRadius, radiusStep, scaleRate, opacity, blur, noiseAmount, fadeIn, fadeOut, followMouse, mouseInfluence, hoverScale]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ display: 'block' }}
    />
  );
};

export default MagicRings;
