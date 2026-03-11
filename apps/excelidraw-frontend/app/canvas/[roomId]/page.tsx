"use client";
import { useEffect, useRef } from "react";

const CanvasPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let clicked = false;
      let startX = 0;
      let startY = 0;

      if (!ctx) return;

      canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
      });

      canvas.addEventListener("mouseup", (e) => {
        clicked = false;
      });

      canvas.addEventListener("mousemove", (e) => {
        // ctx.beginPath();
        // ctx.moveTo(e.offsetX, e.offsetY);
        // ctx.lineTo(e.offsetX, e.offsetY);
        // ctx.stroke();
        if (clicked) {
          const width = e.clientX - startX;
          const height = e.clientY - startY;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.strokeRect(startX, startY, width, height);
        }
      });
    }
  }, [canvasRef]);
  return (
    <div>
      CanvasPage
      <canvas ref={canvasRef} width={1000} height={1000}></canvas>
    </div>
  );
};

export default CanvasPage;
