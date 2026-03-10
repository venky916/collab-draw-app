"use client";
import React, { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

const ChatRoomClient = ({
  messages,
  id,
}: {
  messages: { message: string; roomId: string; type: string }[];
  id: string;
}) => {
  const { socket, loading } = useSocket();
  const [chats, setChats] = useState(messages);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    if (socket && !loading) {
      socket.send(JSON.stringify({ type: "join_room", roomId: id }));
      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);

        if (parsedData.type === "chat") {
          // check the room id
          setChats((prev) => [...prev, { ...parsedData }])
        }
      };
    }
  }, [socket, loading]);

  return (
    <div>
      {chats.map((chat, index) => (
        <p key={index}>{chat.message}</p>
      ))}
      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />
      <button
        onClick={() => {
          if (currentMessage.trim() !== "") {
            socket?.send(
              JSON.stringify({
                type: "chat",
                message: currentMessage,
                roomId: id,
              }),
            );
            setCurrentMessage("");
          }
        }}
      >
        Send
      </button>
    </div>
  );
};

export default ChatRoomClient;
