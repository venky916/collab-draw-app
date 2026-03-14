"use client";
import { WS_URL } from "@/config";
import { initDraw } from "@/draw";
import { use, useEffect, useRef, useState } from "react";

const CanvasClient = ({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket); // pass roomId here
    }
  }, [canvasRef,socket,roomId]);

  return (
    <div className="relative cursor-cell">
      <canvas ref={canvasRef} width={10000} height={1000}></canvas>
      <div className="absolute top-0 left-0 flex gap-4 items-center">
        <button className="bg-white text-black px-4 py-2 rounded-2xl">
          Rect
        </button>
        <button className="bg-white text-black px-4 py-2 rounded-2xl">
          Circle
        </button>
      </div>
    </div>
  );
};

export default CanvasClient;
