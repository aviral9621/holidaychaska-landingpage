"use client";
import { useEffect, useImperativeHandle, useRef, forwardRef, useCallback } from "react";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";

function generate(): string {
  let code = "";
  for (let i = 0; i < 6; i++) code += CHARS[Math.floor(Math.random() * CHARS.length)];
  return code;
}

function draw(canvas: HTMLCanvasElement, code: string) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  canvas.width = 200;
  canvas.height = 60;
  ctx.fillStyle = "#112244";
  ctx.fillRect(0, 0, 200, 60);
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${Math.random() * 100 + 100}, ${Math.random() * 50}, ${Math.random() * 50}, 0.5)`;
    ctx.lineWidth = 1.5;
    ctx.moveTo(Math.random() * 200, Math.random() * 60);
    ctx.lineTo(Math.random() * 200, Math.random() * 60);
    ctx.stroke();
  }
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = `rgba(255,255,255,0.15)`;
    ctx.fillRect(Math.random() * 200, Math.random() * 60, 2, 2);
  }
  code.split("").forEach((char, i) => {
    ctx.save();
    ctx.font = `bold ${24 + Math.floor(Math.random() * 10)}px Courier New`;
    ctx.fillStyle = i % 2 === 0 ? "#FFFFFF" : "#E8B84B";
    ctx.translate(18 + i * 28, 40);
    ctx.rotate((Math.random() - 0.5) * 0.5);
    ctx.fillText(char, 0, 0);
    ctx.restore();
  });
}

export type CaptchaHandle = {
  validate: (input: string) => boolean;
  refresh: () => void;
};

const CaptchaCanvas = forwardRef<CaptchaHandle>(function CaptchaCanvas(_props, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const codeRef = useRef<string>("");

  const refresh = useCallback(() => {
    const code = generate();
    codeRef.current = code;
    if (canvasRef.current) draw(canvasRef.current, code);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useImperativeHandle(ref, () => ({
    validate: (input: string) => input.trim().toLowerCase() === codeRef.current.toLowerCase(),
    refresh,
  }));

  return (
    <div className="flex items-center gap-3">
      <canvas
        ref={canvasRef}
        width={200}
        height={60}
        className="rounded-md border border-[rgba(201,146,42,0.3)]"
        aria-label="Captcha challenge"
      />
      <button
        type="button"
        onClick={refresh}
        aria-label="Refresh captcha"
        className="w-10 h-10 rounded-md border border-[rgba(201,146,42,0.3)] text-[var(--color-gold)] hover:bg-[rgba(201,146,42,0.1)] transition flex items-center justify-center text-lg"
      >
        ↻
      </button>
    </div>
  );
});

export default CaptchaCanvas;
