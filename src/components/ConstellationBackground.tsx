'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
}

interface Connection {
  star1: Star;
  star2: Star;
  distance: number;
}

const ConstellationBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const numStars = Math.floor((window.innerWidth * window.innerHeight) / 8000);
      starsRef.current = [];

      for (let i = 0; i < numStars; i++) {
        starsRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          twinkleSpeed: (Math.random() * 0.0005 + 0.0003), // Much slower - 1 pulse per 3-4 seconds
        });
      }
      
      updateConnections();
    };

    const updateConnections = () => {
      const maxDistance = 150;
      connectionsRef.current = [];

      for (let i = 0; i < starsRef.current.length; i++) {
        for (let j = i + 1; j < starsRef.current.length; j++) {
          const star1 = starsRef.current[i];
          const star2 = starsRef.current[j];
          const distance = Math.sqrt(
            Math.pow(star1.x - star2.x, 2) + Math.pow(star1.y - star2.y, 2)
          );

          if (distance < maxDistance) {
            connectionsRef.current.push({ star1, star2, distance });
          }
        }
      }
    };

    const drawStar = (star: Star, time: number) => {
      const twinkle = Math.sin(time * star.twinkleSpeed) * 0.3 + 0.7;
      const alpha = star.opacity * twinkle;
      
      ctx.save();
      ctx.globalAlpha = alpha;
      
      // Create a glowing effect
      const gradient = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, star.size * 3
      );
      gradient.addColorStop(0, '#64ffda');
      gradient.addColorStop(0.5, 'rgba(100, 255, 218, 0.3)');
      gradient.addColorStop(1, 'rgba(100, 255, 218, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw the core star
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const drawConnection = (connection: Connection) => {
      const maxDistance = 150;
      const opacity = 1 - (connection.distance / maxDistance);
      
      ctx.save();
      ctx.globalAlpha = opacity * 0.3;
      ctx.strokeStyle = '#64ffda';
      ctx.lineWidth = 1;
      
      ctx.beginPath();
      ctx.moveTo(connection.star1.x, connection.star1.y);
      ctx.lineTo(connection.star2.x, connection.star2.y);
      ctx.stroke();
      
      ctx.restore();
    };

    const updateStars = () => {
      starsRef.current.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around edges
        if (star.x < 0) star.x = window.innerWidth;
        if (star.x > window.innerWidth) star.x = 0;
        if (star.y < 0) star.y = window.innerHeight;
        if (star.y > window.innerHeight) star.y = 0;
      });
      
      updateConnections();
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create a subtle gradient background (dimmed by ~8%)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#090910'); // Slightly darker than #0a0a0f
      gradient.addColorStop(0.5, '#0e0e18'); // Slightly darker than #0f0f1a  
      gradient.addColorStop(1, '#090910'); // Slightly darker than #0a0a0f
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      updateStars();
      
      // Draw connections first (behind stars)
      connectionsRef.current.forEach(connection => {
        drawConnection(connection);
      });
      
      // Draw stars on top
      starsRef.current.forEach(star => {
        drawStar(star, time);
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleResize = () => {
      resizeCanvas();
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    animate(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default ConstellationBackground;
