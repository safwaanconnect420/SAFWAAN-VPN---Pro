import React, { useEffect, useRef } from 'react';

const SmokeEffect = ({ intensity = 0.5 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    const particles = [];
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 50 + 20;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = Math.random() * -1 - 0.5;
        this.opacity = 0.3 + Math.random() * 0.2;
        this.life = 1;
        this.decay = Math.random() * 0.008 + 0.002;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.opacity = Math.max(0, this.opacity - this.decay);
        this.speedX *= 0.99;
        this.speedY -= 0.01;
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity * this.life;
        ctx.fillStyle = '#a855f7';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create particles on mouse move
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(mouseX, mouseY));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);

        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-30"
      style={{ opacity: 0.6 }}
    />
  );
};

export default SmokeEffect;
