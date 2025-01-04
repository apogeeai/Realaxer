'use client';

import { useState, useEffect, useRef } from 'react';

export function Game({ isPlaying }: { isPlaying: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current || !isPlaying) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let particles: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      trail: Array<{ x: number; y: number }>;
    }> = [];

    const colors = [
      '#ffffff', // White
      '#e6f3ff', // Light blue
      '#b3d9ff', // Sky blue
      '#80c1ff', // Bright blue
    ];

    const createParticle = (x: number, y: number) => ({
      x,
      y,
      size: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 8,
      speedY: (Math.random() - 0.5) * 8,
      trail: [],
    });

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      for (let i = 0; i < 2; i++) {
        particles.push(createParticle(x, y));
      }
      
      if (particles.length > 100) {
        particles = particles.slice(-100);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const drawComet = (particle: typeof particles[0]) => {
      const { trail } = particle;
      
      // Update trail
      trail.unshift({ x: particle.x, y: particle.y });
      if (trail.length > 10) trail.pop();

      // Draw trail
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);
      
      for (let i = 1; i < trail.length; i++) {
        const point = trail[i];
        ctx.lineTo(point.x, point.y);
      }
      
      ctx.strokeStyle = particle.color;
      ctx.lineWidth = particle.size;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Draw head
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    };

    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges with reduced speed
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -0.6;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -0.6;
        
        // Apply more friction for slower movement
        particle.speedX *= 0.96;
        particle.speedY *= 0.96;

        // Remove slower particles
        if (Math.abs(particle.speedX) < 0.1 && Math.abs(particle.speedY) < 0.1) {
          particles.splice(index, 1);
          return;
        }

        drawComet(particle);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  if (!isPlaying) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 touch-none"
      style={{ background: 'transparent' }}
    />
  );
}