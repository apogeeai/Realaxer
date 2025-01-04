'use client';

import { useEffect, useRef } from 'react';

export function SpaceEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stars: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
    }> = [];

    let astronautX = Math.random() * canvas.width;
    let astronautY = Math.random() * canvas.height;
    let astronautDx = 0.5;
    let astronautDy = 0.3;

    const createStar = () => ({
      x: Math.random() * canvas.width - canvas.width / 2,
      y: Math.random() * canvas.height - canvas.height / 2,
      z: Math.random() * 1500,
      size: 1
    });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      for (let i = 0; i < 1000; i++) {
        stars.push(createStar());
      }
    };

    const drawAstronaut = () => {
      // Simple astronaut representation
      ctx.save();
      ctx.translate(astronautX, astronautY);
      
      // Suit
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.fill();
      
      // Visor
      ctx.fillStyle = '#4da9ff';
      ctx.beginPath();
      ctx.arc(0, -5, 8, 0, Math.PI, false);
      ctx.fill();
      
      // Backpack
      ctx.fillStyle = '#cccccc';
      ctx.fillRect(-8, -8, 6, 16);
      
      ctx.restore();

      // Update astronaut position
      astronautX += astronautDx;
      astronautY += astronautDy;

      // Bounce off edges
      if (astronautX < 0 || astronautX > canvas.width) astronautDx *= -1;
      if (astronautY < 0 || astronautY > canvas.height) astronautDy *= -1;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate center of screen
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach((star, index) => {
        star.z -= 10; // Move stars towards viewer

        if (star.z <= 0) {
          stars[index] = createStar();
          stars[index].z = 1500;
        }

        // Project 3D position to 2D screen
        const x = (star.x / star.z) * 500 + centerX;
        const y = (star.y / star.z) * 500 + centerY;
        const size = Math.max(0.1, (1 - star.z / 1500) * 3);

        // Skip invalid coordinates
        if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(size)) {
          return;
        }

        // Draw star
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(x, y, size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      drawAstronaut();
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
} 