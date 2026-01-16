import { useEffect, useRef } from "react";

const GradientWaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

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

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Get computed styles for theme-aware colors
      const computedStyle = getComputedStyle(document.documentElement);
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
