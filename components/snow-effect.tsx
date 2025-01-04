'use client';

import { useEffect, useRef } from 'react';

export function SnowEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const snowflakes: Array<{
      x: number;
      y: number;
      radius: number;
      speed: number;
      wind: number;
    }> = [];

    const createSnowflake = () => ({
      x: Math.random() * canvas.width,
      y: 0,
      radius: Math.random() * 3 + 1,
      speed: Math.random() * 3 + 1,
      wind: Math.random() * 0.5 - 0.25
    });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      for (let i = 0; i < 200; i++) {
        snowflakes.push({
          ...createSnowflake(),
          y: Math.random() * canvas.height
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

      snowflakes.forEach((flake, index) => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();

        flake.y += flake.speed;
        flake.x += flake.wind;

        if (flake.y > canvas.height) {
          snowflakes[index] = createSnowflake();
        }
      });

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