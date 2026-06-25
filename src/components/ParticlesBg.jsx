import React, { useEffect, useRef } from "react";

export default function ParticlesBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationId;
    let particles = [];
    const colors = [
      "rgba(139, 0, 0, 0.45)", // Red Batak (Ulos Red)
      "rgba(255, 255, 255, 0.35)", // Pure White
      "rgba(212, 175, 55, 0.35)",  // Subtle Gold Accent
      "rgba(17, 17, 17, 0.65)"      // Deep Black
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height + canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedY = -(Math.random() * 0.8 + 0.2);
        this.speedX = Math.sin(Math.random() * 2 * Math.PI) * 0.15;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.amplitude = Math.random() * 0.5 + 0.1;
        this.angle = Math.random() * 100;
        this.angleSpeed = Math.random() * 0.02 + 0.005;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.angle) * this.amplitude;
        this.angle += this.angleSpeed;

        // Reset if it goes out of screen
        if (this.y < -10) {
          this.y = canvas.height + 10;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        // Glow effect for red and gold particles
        if (this.color.includes("139") || this.color.includes("212")) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = this.color;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }
    }

    // Initialize particles
    const init = () => {
      particles = [];
      const count = Math.min(75, Math.floor(window.innerWidth / 20));
      for (let i = 0; i < count; i++) {
        const p = new Particle();
        p.y = Math.random() * canvas.height; // Spread initially
        particles.push(p);
      }
    };

    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 0; // Reset shadow for background clears
      
      // Draw a subtle radial gradient for lighting
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 10,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, "rgba(25, 0, 0, 0.1)");
      gradient.addColorStop(0.5, "rgba(10, 10, 10, 0)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.5)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
