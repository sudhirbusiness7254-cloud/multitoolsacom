import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

const GradientWaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      // Reinitialize particles on resize
      initParticles(rect.width, rect.height);
    };

    const initParticles = (width: number, height: number) => {
      const particleCount = Math.floor((width * height) / 15000); // Responsive particle count
      particlesRef.current = [];
      
      for (let i = 0; i < Math.min(particleCount, 50); i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: -Math.random() * 0.5 - 0.1, // Mostly upward movement
          opacity: Math.random() * 0.5 + 0.2,
          hue: Math.random() > 0.5 ? 24 : 12, // Orange or red hue
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const drawWave = (
      yOffset: number,
      amplitude: number,
      frequency: number,
      speed: number,
      color: string,
      opacity: number
    ) => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let x = 0; x <= width; x += 2) {
        const y =
          yOffset +
          Math.sin((x * frequency) / 100 + time * speed) * amplitude +
          Math.sin((x * frequency * 0.5) / 100 + time * speed * 0.7) * (amplitude * 0.5);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      ctx.fillStyle = color.replace(")", ` / ${opacity})`).replace("hsl", "hsla");
      ctx.fill();
    };

    const drawParticles = (width: number, height: number, isDark: boolean) => {
      particlesRef.current.forEach((particle) => {
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.pulse += particle.pulseSpeed;

        // Wrap around edges
        if (particle.y < -10) {
          particle.y = height + 10;
          particle.x = Math.random() * width;
        }
        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;

        // Calculate pulsing opacity
        const pulsingOpacity = particle.opacity * (0.5 + Math.sin(particle.pulse) * 0.5);
        const finalOpacity = isDark ? pulsingOpacity * 0.8 : pulsingOpacity * 0.6;

        // Draw particle with glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        
        const saturation = isDark ? "70%" : "85%";
        const lightness = isDark ? "55%" : "50%";
        
        gradient.addColorStop(0, `hsla(${particle.hue}, ${saturation}, ${lightness}, ${finalOpacity})`);
        gradient.addColorStop(0.4, `hsla(${particle.hue}, ${saturation}, ${lightness}, ${finalOpacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, ${saturation}, ${lightness}, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw bright center
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 90%, 70%, ${finalOpacity * 1.5})`;
        ctx.fill();
      });
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Get computed styles for theme-aware colors
      const isDark = document.documentElement.classList.contains("dark");

      // Base colors that adapt to theme
      const primaryHue = isDark ? "24 85% 55%" : "24 95% 50%";
      const accentHue = isDark ? "12 75% 52%" : "12 90% 50%";
      const secondaryHue = isDark ? "28 55% 50%" : "38 92% 50%";

      // Draw multiple wave layers with depth effect
      // Back waves (slower, more transparent)
      drawWave(height * 0.75, 25, 0.8, 0.3, `hsl(${primaryHue})`, isDark ? 0.08 : 0.05);
      drawWave(height * 0.78, 30, 0.6, 0.25, `hsl(${secondaryHue})`, isDark ? 0.06 : 0.04);
      
      // Middle waves
      drawWave(height * 0.82, 35, 1.0, 0.4, `hsl(${accentHue})`, isDark ? 0.10 : 0.06);
      drawWave(height * 0.85, 28, 0.9, 0.35, `hsl(${primaryHue})`, isDark ? 0.08 : 0.05);
      
      // Draw particles on top of back/middle waves but behind front waves
      drawParticles(width, height, isDark);
      
      // Front waves (faster, more visible)
      drawWave(height * 0.88, 20, 1.2, 0.5, `hsl(${secondaryHue})`, isDark ? 0.12 : 0.07);
      drawWave(height * 0.92, 15, 1.4, 0.55, `hsl(${accentHue})`, isDark ? 0.10 : 0.06);
      drawWave(height * 0.95, 10, 1.6, 0.6, `hsl(${primaryHue})`, isDark ? 0.15 : 0.08);

      time += 0.015;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default GradientWaveBackground;
