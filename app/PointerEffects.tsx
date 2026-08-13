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
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const trail: TrailParticle[] = [];
    const burst: BurstParticle[] = [];
    const colors: ParticleColor[] = [
      [102, 225, 255],
      [72, 172, 255],
      [65, 236, 212],
      [158, 122, 255],
      [143, 213, 255],
    ];
    let animationFrame = 0;
    let running = false;
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
        particle.life -= 0.014;
        particle.radius *= 1.024;
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
      if (trail.length || burst.length) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        running = false;
      }
    };

    const requestRender = () => {
      if (running || reducedMotion.matches || document.hidden) return;
      running = true;
      animationFrame = window.requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      if (reducedMotion.matches) return;
      const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
      if (distance < 18) return;
      lastX = event.clientX;
      lastY = event.clientY;
      const count = 1 + Math.floor(Math.random() * 2);
      for (let index = 0; index < count; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const spread = 4 + Math.random() * 23;
        trail.push({
          x: event.clientX + Math.cos(angle) * spread,
          y: event.clientY + Math.sin(angle) * spread,
          radius: 2.5 + Math.random() * 3.5,
          alpha: 0.38 + Math.random() * 0.22,
          life: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      if (trail.length > 38) trail.splice(0, trail.length - 38);
      requestRender();
    };

    const onDown = (event: PointerEvent) => {
      if (reducedMotion.matches) return;
      for (let index = 0; index < 16; index += 1) {
        const angle = (Math.PI * 2 * index) / 16 + (Math.random() - 0.5) * 0.35;
        const speed = 0.8 + Math.random() * 2.45;
        burst.push({ x: event.clientX, y: event.clientY, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, radius: 0.85 + Math.random() * 1.25, alpha: 0.92, life: 1, decay: 0.022 + Math.random() * 0.018, color: colors[Math.floor(Math.random() * colors.length)] });
      }
      if (burst.length > 128) burst.splice(0, burst.length - 128);
      requestRender();
    };

    const stop = () => {
      trail.splice(0);
      burst.splice(0);
      window.cancelAnimationFrame(animationFrame);
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      running = false;
    };
    const onMotionChange = () => { if (reducedMotion.matches) stop(); };
    const onVisibilityChange = () => { if (document.hidden) stop(); };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    reducedMotion.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      reducedMotion.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <canvas className="pointer-effects" ref={canvasRef} aria-hidden="true" />;
}
