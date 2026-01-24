import { useEffect, useRef } from "react";

interface AnimatedHeroBackgroundProps {
  gradientFrom: string;
  gradientTo: string;
  heroImage?: string;
  categoryName?: string;
  variant?: "particles" | "waves" | "bubbles" | "stars" | "geometric";
}

const AnimatedHeroBackground = ({ 
  gradientFrom, 
  gradientTo, 
  heroImage,
  categoryName = "",
  variant = "particles"
}: AnimatedHeroBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Parse hex color to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 139, g: 92, b: 246 }; // default purple
    };

    const color1 = hexToRgb(gradientFrom);
    const color2 = hexToRgb(gradientTo);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: { r: number; g: number; b: number };

      constructor() {
        this.x = Math.random() * canvas.offsetWidth;
        this.y = Math.random() * canvas.offsetHeight;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? color1 : color2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.offsetWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.offsetHeight) this.speedY *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Wave animation
    let waveOffset = 0;
    const drawWaves = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.offsetHeight);
        
        const amplitude = 20 + i * 10;
        const frequency = 0.02 - i * 0.005;
        const speed = waveOffset * (1 + i * 0.3);
        
        for (let x = 0; x <= canvas.offsetWidth; x += 5) {
          const y = canvas.offsetHeight - 50 - i * 30 + 
                   Math.sin(x * frequency + speed) * amplitude +
                   Math.sin(x * frequency * 0.5 + speed * 0.7) * amplitude * 0.5;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.offsetWidth, canvas.offsetHeight);
        ctx.closePath();
        
        const opacity = 0.1 - i * 0.02;
        const gradient = ctx.createLinearGradient(0, 0, canvas.offsetWidth, 0);
        gradient.addColorStop(0, `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${opacity})`);
        gradient.addColorStop(1, `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${opacity})`);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      waveOffset += 0.02;
    };

    // Bubble class
    class Bubble {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.offsetWidth;
        this.y = canvas.offsetHeight + Math.random() * 100;
        this.size = Math.random() * 20 + 5;
        this.speed = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.y -= this.speed;
        this.x += Math.sin(this.y * 0.02) * 0.5;
        
        if (this.y < -this.size) {
          this.y = canvas.offsetHeight + this.size;
          this.x = Math.random() * canvas.offsetWidth;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          this.x - this.size * 0.3, this.y - this.size * 0.3, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${this.opacity})`);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Star class
    class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      phase: number;

      constructor() {
        this.x = Math.random() * canvas.offsetWidth;
        this.y = Math.random() * canvas.offsetHeight;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.twinkleSpeed = Math.random() * 0.05 + 0.01;
        this.phase = Math.random() * Math.PI * 2;
      }

      update() {
        this.phase += this.twinkleSpeed;
        this.opacity = 0.3 + Math.sin(this.phase) * 0.3;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${this.opacity})`;
        ctx.fill();
        
        // Star glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${this.opacity * 0.2})`;
        ctx.fill();
      }
    }

    // Geometric shape class
    class GeometricShape {
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      sides: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas.offsetWidth;
        this.y = Math.random() * canvas.offsetHeight;
        this.size = Math.random() * 30 + 10;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.15 + 0.05;
        this.sides = Math.floor(Math.random() * 4) + 3; // 3-6 sides
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
      }

      update() {
        this.rotation += this.rotationSpeed;
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < -this.size) this.x = canvas.offsetWidth + this.size;
        if (this.x > canvas.offsetWidth + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas.offsetHeight + this.size;
        if (this.y > canvas.offsetHeight + this.size) this.y = -this.size;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        ctx.beginPath();
        for (let i = 0; i < this.sides; i++) {
          const angle = (i * 2 * Math.PI) / this.sides - Math.PI / 2;
          const x = Math.cos(angle) * this.size;
          const y = Math.sin(angle) * this.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        
        ctx.strokeStyle = `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.restore();
      }
    }

    // Initialize elements based on variant
    const elements: (Particle | Bubble | Star | GeometricShape)[] = [];
    const count = variant === "particles" ? 50 : 
                  variant === "bubbles" ? 20 : 
                  variant === "stars" ? 80 :
                  variant === "geometric" ? 15 : 0;

    for (let i = 0; i < count; i++) {
      switch (variant) {
        case "particles":
          elements.push(new Particle());
          break;
        case "bubbles":
          elements.push(new Bubble());
          break;
        case "stars":
          elements.push(new Star());
          break;
        case "geometric":
          elements.push(new GeometricShape());
          break;
      }
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      if (!ctx) return;
      
      if (variant === "waves") {
        drawWaves();
      } else {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        elements.forEach(element => {
          element.update();
          element.draw();
        });

        // Draw connections for particles
        if (variant === "particles") {
          elements.forEach((p1, i) => {
            elements.slice(i + 1).forEach(p2 => {
              const dx = (p1 as Particle).x - (p2 as Particle).x;
              const dy = (p1 as Particle).y - (p2 as Particle).y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo((p1 as Particle).x, (p1 as Particle).y);
                ctx.lineTo((p2 as Particle).x, (p2 as Particle).y);
                ctx.strokeStyle = `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${0.1 * (1 - distance / 100)})`;
                ctx.stroke();
              }
            });
          });
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [gradientFrom, gradientTo, variant]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Hero Image Background */}
      {heroImage && (
        <img 
          src={heroImage} 
          alt={`${categoryName} hero banner`}
          className="absolute inset-0 w-full h-full object-cover opacity-15 dark:opacity-10"
          loading="eager"
        />
      )}
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}30 0%, ${gradientTo}20 50%, transparent 100%)`
        }}
      />
      
      {/* Animated Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      />
      
      {/* Additional floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${20 + i * 15}px`,
              height: `${20 + i * 15}px`,
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
              background: `radial-gradient(circle, ${gradientFrom}20 0%, transparent 70%)`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedHeroBackground;