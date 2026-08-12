"use client";

import { useEffect, useRef } from "react";

type TrailParticle = { x: number; y: number; radius: number; alpha: number; life: number };
type BurstParticle = { x: number; y: number; vx: number; vy: number; radius: number; alpha: number; life: number; decay: number };

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

    const drawGlow = (x: number, y: number, radius: number, alpha: number) => {
      const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(186, 239, 255, ${alpha})`);
      gradient.addColorStop(0.38, `rgba(110, 208, 255, ${alpha * 0.58})`);
      gradient.addColorStop(1, "rgba(62, 171, 255, 0)");
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
        drawGlow(particle.x, particle.y, particle.radius, particle.alpha * particle.life * particle.life);
      }
      for (let index = burst.length - 1; index >= 0; index -= 1) {
        const particle = burst[index];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.975;
        particle.vy *= 0.975;
        particle.life -= particle.decay;
        if (particle.life <= 0) { burst.splice(index, 1); continue; }
        drawGlow(particle.x, particle.y, particle.radius * 3.8, particle.alpha * particle.life);
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
      trail.push({ x: event.clientX, y: event.clientY, radius: 8 + Math.random() * 9, alpha: 0.3 + Math.random() * 0.16, life: 1 });
      if (trail.length > 44) trail.splice(0, trail.length - 44);
    };

    const onDown = (event: PointerEvent) => {
      if (reducedMotion.matches) return;
      for (let index = 0; index < 22; index += 1) {
        const angle = (Math.PI * 2 * index) / 22 + (Math.random() - 0.5) * 0.35;
        const speed = 1.2 + Math.random() * 3.7;
        burst.push({ x: event.clientX, y: event.clientY, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, radius: 1.3 + Math.random() * 2.2, alpha: 0.9, life: 1, decay: 0.018 + Math.random() * 0.016 });
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
