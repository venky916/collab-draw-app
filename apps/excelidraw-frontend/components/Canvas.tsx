"use client";
import React, { useEffect, useState } from "react";
import CanvasClient from "./CanvasClient";
import { WS_URL } from "@/config";

const Canvas = ({ roomId }: { roomId: string }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const wss = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjYmM4NGVmYi05MjQ5LTRiNDgtODIyMy0wM2JlYTc3NzRlNTQiLCJpYXQiOjE3NzM0MjQyMTR9.4mXS_Hgj-CNlZYDFLbBILygEwbmisLhycZyCFJZqiE4`,
    );

    wss.onopen = () => {
      console.log("connected to server");
      setSocket(wss);
      wss.send(
        JSON.stringify({
          type: "join_room",
          roomId,
        }),
      );
    };
    return () => {
      wss.close();
    };
  }, [roomId]);

  if (!socket) return <div>Connecting to server....</div>;
  return (
    <div>
      <CanvasClient roomId={roomId} socket={socket} />
    </div>
  );
};

export default Canvas;
