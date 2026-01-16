import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

interface MouseState {
  x: number;
  y: number;
  isActive: boolean;
}

const GradientWaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const mouseRef = useRef<MouseState>({ x: 0, y: 0, isActive: false });

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
      const particleCount = Math.floor((width * height) / 15000);
      particlesRef.current = [];
      
      for (let i = 0; i < Math.min(particleCount, 50); i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particlesRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: -Math.random() * 0.5 - 0.1,
          opacity: Math.random() * 0.5 + 0.2,
          hue: Math.random() > 0.5 ? 24 : 12,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Add a new ripple
      ripplesRef.current.push({
        x,
        y,
        radius: 0,
        maxRadius: 200,
        opacity: 0.6,
        speed: 4,
      });
    };

    // Enable pointer events for interaction
    canvas.style.pointerEvents = "auto";
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    resize();
    window.addEventListener("resize", resize);

    const getMouseInfluence = (x: number, y: number, radius: number = 150) => {
      if (!mouseRef.current.isActive) return { dx: 0, dy: 0, factor: 0 };
      
      const dx = x - mouseRef.current.x;
      const dy = y - mouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > radius) return { dx: 0, dy: 0, factor: 0 };
      
      const factor = 1 - distance / radius;
      return { dx, dy, factor: factor * factor }; // Quadratic falloff for smoother effect
    };

    const drawWave = (
      yOffset: number,
      amplitude: number,
      frequency: number,
      speed: number,
      color: string,
      opacity: number,
      mouseInfluenceStrength: number = 30
    ) => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let x = 0; x <= width; x += 2) {
        let y =
          yOffset +
          Math.sin((x * frequency) / 100 + time * speed) * amplitude +
          Math.sin((x * frequency * 0.5) / 100 + time * speed * 0.7) * (amplitude * 0.5);
        
        // Apply mouse influence to waves
        const mouseEffect = getMouseInfluence(x, y, 180);
        if (mouseEffect.factor > 0) {
          y -= mouseEffect.factor * mouseInfluenceStrength;
        }
        
        // Apply ripple effects to waves
        ripplesRef.current.forEach((ripple) => {
          const dx = x - ripple.x;
          const dy = y - ripple.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const rippleWidth = 40;
          
          if (Math.abs(distance - ripple.radius) < rippleWidth) {
            const rippleEffect = Math.sin(((distance - ripple.radius) / rippleWidth) * Math.PI);
            y -= rippleEffect * ripple.opacity * 20;
          }
        });
        
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      ctx.fillStyle = color.replace(")", ` / ${opacity})`).replace("hsl", "hsla");
      ctx.fill();
    };

    const drawRipples = (isDark: boolean) => {
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        ripple.radius += ripple.speed;
        ripple.opacity -= 0.008;
        
        if (ripple.opacity <= 0 || ripple.radius > ripple.maxRadius) {
          return false;
        }
        
        const hue = isDark ? "24 85% 55%" : "24 95% 50%";
        
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${hue} / ${ripple.opacity * 0.5})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Inner glow ring
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius * 0.8, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${hue} / ${ripple.opacity * 0.3})`;
        ctx.lineWidth = 4;
        ctx.stroke();
        
        return true;
      });
    };

    const drawParticles = (width: number, height: number, isDark: boolean) => {
      particlesRef.current.forEach((particle) => {
        // Update base position
        particle.baseX += particle.speedX;
        particle.baseY += particle.speedY;
        particle.pulse += particle.pulseSpeed;

        // Wrap around edges
        if (particle.baseY < -10) {
          particle.baseY = height + 10;
          particle.baseX = Math.random() * width;
        }
        if (particle.baseX < -10) particle.baseX = width + 10;
        if (particle.baseX > width + 10) particle.baseX = -10;

        // Apply mouse influence - particles move away from cursor
        const mouseEffect = getMouseInfluence(particle.baseX, particle.baseY, 120);
        let displayX = particle.baseX;
        let displayY = particle.baseY;
        
        if (mouseEffect.factor > 0 && mouseEffect.dx !== 0) {
          const pushStrength = 50;
          const normalizedDx = mouseEffect.dx / Math.sqrt(mouseEffect.dx ** 2 + mouseEffect.dy ** 2);
          const normalizedDy = mouseEffect.dy / Math.sqrt(mouseEffect.dx ** 2 + mouseEffect.dy ** 2);
          displayX += normalizedDx * mouseEffect.factor * pushStrength;
          displayY += normalizedDy * mouseEffect.factor * pushStrength;
        }

        // Apply ripple effects to particles
        ripplesRef.current.forEach((ripple) => {
          const dx = particle.baseX - ripple.x;
          const dy = particle.baseY - ripple.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const rippleWidth = 60;
          
          if (Math.abs(distance - ripple.radius) < rippleWidth && distance > 0) {
            const rippleEffect = Math.sin(((distance - ripple.radius) / rippleWidth) * Math.PI);
            const pushAmount = rippleEffect * ripple.opacity * 30;
            displayX += (dx / distance) * pushAmount;
            displayY += (dy / distance) * pushAmount;
          }
        });

        particle.x = displayX;
        particle.y = displayY;

        // Calculate pulsing opacity with mouse boost
        let pulsingOpacity = particle.opacity * (0.5 + Math.sin(particle.pulse) * 0.5);
        
        // Boost opacity when near mouse
        if (mouseEffect.factor > 0) {
          pulsingOpacity += mouseEffect.factor * 0.4;
        }
        
        const finalOpacity = Math.min(isDark ? pulsingOpacity * 0.8 : pulsingOpacity * 0.6, 1);

        // Draw particle with glow effect
        const glowSize = particle.size * 3 * (1 + mouseEffect.factor * 0.5);
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowSize
        );
        
        const saturation = isDark ? "70%" : "85%";
        const lightness = isDark ? "55%" : "50%";
        
        gradient.addColorStop(0, `hsla(${particle.hue}, ${saturation}, ${lightness}, ${finalOpacity})`);
        gradient.addColorStop(0.4, `hsla(${particle.hue}, ${saturation}, ${lightness}, ${finalOpacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, ${saturation}, ${lightness}, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw bright center
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5 * (1 + mouseEffect.factor * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 90%, 70%, ${Math.min(finalOpacity * 1.5, 1)})`;
        ctx.fill();
      });
    };

    const drawMouseGlow = (isDark: boolean) => {
      if (!mouseRef.current.isActive) return;
      
      const { x, y } = mouseRef.current;
      const hue = isDark ? "24 85% 55%" : "24 95% 50%";
      
      // Outer glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 100);
      gradient.addColorStop(0, `hsla(${hue} / 0.15)`);
      gradient.addColorStop(0.5, `hsla(${hue} / 0.05)`);
      gradient.addColorStop(1, `hsla(${hue} / 0)`);
      
      ctx.beginPath();
      ctx.arc(x, y, 100, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");

      // Base colors that adapt to theme
      const primaryHue = isDark ? "24 85% 55%" : "24 95% 50%";
      const accentHue = isDark ? "12 75% 52%" : "12 90% 50%";
      const secondaryHue = isDark ? "28 55% 50%" : "38 92% 50%";

      // Draw mouse glow first (behind everything)
      drawMouseGlow(isDark);

      // Draw waves with mouse influence
      drawWave(height * 0.75, 25, 0.8, 0.3, `hsl(${primaryHue})`, isDark ? 0.08 : 0.05, 20);
      drawWave(height * 0.78, 30, 0.6, 0.25, `hsl(${secondaryHue})`, isDark ? 0.06 : 0.04, 25);
      
      drawWave(height * 0.82, 35, 1.0, 0.4, `hsl(${accentHue})`, isDark ? 0.10 : 0.06, 30);
      drawWave(height * 0.85, 28, 0.9, 0.35, `hsl(${primaryHue})`, isDark ? 0.08 : 0.05, 28);
      
      // Draw ripples
      drawRipples(isDark);
      
      // Draw particles
      drawParticles(width, height, isDark);
      
      // Front waves
      drawWave(height * 0.88, 20, 1.2, 0.5, `hsl(${secondaryHue})`, isDark ? 0.12 : 0.07, 35);
      drawWave(height * 0.92, 15, 1.4, 0.55, `hsl(${accentHue})`, isDark ? 0.10 : 0.06, 40);
      drawWave(height * 0.95, 10, 1.6, 0.6, `hsl(${primaryHue})`, isDark ? 0.15 : 0.08, 45);

      time += 0.015;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full cursor-pointer"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default GradientWaveBackground;
