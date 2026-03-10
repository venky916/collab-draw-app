"use server";
import axios from "axios";
import { BACKEND_URL } from "../app/config";
import ChatRoomClient from "./ChatRoomClient";

async function getChats(roomId: string) {
  const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjYmM4NGVmYi05MjQ5LTRiNDgtODIyMy0wM2JlYTc3NzRlNTQiLCJpYXQiOjE3NzMxNTk4NDl9.m4oEZHuf6laVfw2f-DbZxlBrQBx54ttcMvA9vuBuoMY",
    },
  });
  return response.data;
}

export async function ChatRoom({ id }: { id: string }) {

  const messages = await getChats(id);

  return <ChatRoomClient messages={messages} id={id} />;
}

export default ChatRoom;
