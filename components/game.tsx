'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

export function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !isPlaying) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Make canvas responsive
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
    }> = [];

    const colors = ['#ff9a9e', '#fad0c4', '#ffecd2', '#fcb69f'];

    const createParticle = (x: number, y: number) => {
      return {
        x,
        y,
        radius: Math.random() * 8 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (Math.random() > 0.5) {
        particles.push(createParticle(x, y));
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!ctx) return;
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.radius *= 0.98;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        if (particle.radius < 0.1) {
          particles.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPlaying]);

  return (
    <div className="relative w-full aspect-[4/3] max-w-3xl mx-auto">
      <Button
        className="absolute top-4 right-4 z-10 text-sm sm:text-base"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? 'View Mode' : 'Play Mode'}
      </Button>
      {isPlaying && (
        <canvas
          ref={canvasRef}
          className="w-full h-full rounded-lg bg-white/80 backdrop-blur-sm touch-none"
        />
      )}
    </div>
  );
}