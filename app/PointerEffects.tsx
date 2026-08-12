"use client";

import { useEffect, useRef } from "react";

type ParticleColor = readonly [number, number, number];
type TrailParticle = { x: number; y: number; radius: number; alpha: number; life: number; color: ParticleColor };
type BurstParticle = { x: number; y: number; vx: number; vy: number; radius: number; alpha: number; life: number; decay: number; color: ParticleColor };

export function PointerEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const trail: TrailParticle[] = [];
    const burst: BurstParticle[] = [];
    const colors: ParticleColor[] = [
      [141, 225, 255],
      [100, 194, 255],
      [126, 240, 231],
      [188, 177, 255],
      [213, 237, 255],
    ];
    let animationFrame = 0;
    let lastX = -100;
    let lastY = -100;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * ratio);
      canvas.height = Math.round(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawGlow = (x: number, y: number, radius: number, alpha: number, color: ParticleColor) => {
      const [red, green, blue] = color;
      const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(${red}, ${green}, ${blue}, ${alpha})`);
      gradient.addColorStop(0.35, `rgba(${red}, ${green}, ${blue}, ${alpha * 0.52})`);
      gradient.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`);
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    };

    const render = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.globalCompositeOperation = "lighter";
      for (let index = trail.length - 1; index >= 0; index -= 1) {
        const particle = trail[index];
        particle.life -= 0.023;
        particle.radius *= 1.012;
        if (particle.life <= 0) { trail.splice(index, 1); continue; }
        drawGlow(particle.x, particle.y, particle.radius, particle.alpha * particle.life * particle.life, particle.color);
      }
      for (let index = burst.length - 1; index >= 0; index -= 1) {
        const particle = burst[index];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.975;
        particle.vy *= 0.975;
        particle.life -= particle.decay;
        if (particle.life <= 0) { burst.splice(index, 1); continue; }
        drawGlow(particle.x, particle.y, particle.radius * 3.1, particle.alpha * particle.life, particle.color);
      }
      context.globalCompositeOperation = "source-over";
      animationFrame = window.requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      if (reducedMotion.matches) return;
      const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
      if (distance < 7) return;
      lastX = event.clientX;
      lastY = event.clientY;
      const count = 2 + Math.floor(Math.random() * 3);
      for (let index = 0; index < count; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const spread = 3 + Math.random() * 18;
        trail.push({
          x: event.clientX + Math.cos(angle) * spread,
          y: event.clientY + Math.sin(angle) * spread,
          radius: 3 + Math.random() * 4.5,
          alpha: 0.24 + Math.random() * 0.2,
          life: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      if (trail.length > 72) trail.splice(0, trail.length - 72);
    };

    const onDown = (event: PointerEvent) => {
      if (reducedMotion.matches) return;
      for (let index = 0; index < 22; index += 1) {
        const angle = (Math.PI * 2 * index) / 22 + (Math.random() - 0.5) * 0.35;
        const speed = 1.2 + Math.random() * 3.7;
        burst.push({ x: event.clientX, y: event.clientY, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, radius: 1.1 + Math.random() * 1.8, alpha: 0.9, life: 1, decay: 0.018 + Math.random() * 0.016, color: colors[Math.floor(Math.random() * colors.length)] });
      }
      if (burst.length > 180) burst.splice(0, burst.length - 180);
    };

    const onMotionChange = () => { if (reducedMotion.matches) { trail.splice(0); burst.splice(0); } };
    resize();
    render();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    reducedMotion.addEventListener("change", onMotionChange);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas className="pointer-effects" ref={canvasRef} aria-hidden="true" />;
}
