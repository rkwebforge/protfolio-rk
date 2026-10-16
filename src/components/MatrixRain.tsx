import { useReducedMotion } from "framer-motion";
import React, { useEffect, useRef } from "react";

// Half-width katakana, digits and a few code symbols.
const GLYPHS =
  "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789{}<>/=;$#";
const FONT_SIZE = 16; // px per character cell
const FPS = 18; // slow and cheap; it's a background
const RESET_CHANCE = 0.02; // chance per frame a finished column restarts at the top

const cssVar = (name: string, fallback: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
  fallback;

/** Subtle "digital rain" behind the page. Off when the user prefers reduced motion. */
const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const ink = cssVar("--color-ink", "#1c2128");
    const muted = cssVar("--color-muted", "#8b95a1");
    const accent = cssVar("--color-accent", "#ff4d5e");

    let drops: number[] = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = ink;
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${FONT_SIZE}px "Martian Mono", ui-monospace, monospace`;
      // Start each column at a random height above the screen so they don't fall in sync.
      drops = Array.from(
        { length: Math.ceil(width / FONT_SIZE) },
        () => -Math.floor(Math.random() * (height / FONT_SIZE)),
      );
    };

    const draw = () => {
      // Paint a translucent layer of the page colour so older glyphs fade into trails.
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = ink;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < drops.length; i++) {
        const row = drops[i] ?? 0;
        if (row >= 0) {
          const glyph =
            GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "0";
          const isHead = Math.random() < 0.06;
          ctx.globalAlpha = isHead ? 1 : 0.28;
          ctx.fillStyle = isHead ? accent : muted;
          // Red glyphs glow like neon; only a handful per frame, so the blur is cheap
          ctx.shadowBlur = isHead ? 8 : 0;
          ctx.shadowColor = accent;
          ctx.fillText(glyph, i * FONT_SIZE, row * FONT_SIZE);
        }
        drops[i] =
          row * FONT_SIZE > height && Math.random() < RESET_CHANCE
            ? 0
            : row + 1;
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    let frame = 0;
    let last = 0;
    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      if (time - last < 1000 / FPS) return;
      last = time;
      draw();
    };

    resize();
    frame = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
    />
  );
};

export default MatrixRain;
