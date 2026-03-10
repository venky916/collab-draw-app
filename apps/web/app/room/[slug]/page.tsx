import axios from "axios";
import { BACKEND_URL } from "../../config";
import ChatRoom from "../../../components/ChatRoom";

async function getRoom(slug: string) {
  console.log("Fetching:", `${BACKEND_URL}/room/${slug}`); // full URL
  const res = await axios.get(`${BACKEND_URL}/room/${slug}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjYmM4NGVmYi05MjQ5LTRiNDgtODIyMy0wM2JlYTc3NzRlNTQiLCJpYXQiOjE3NzMxNTk4NDl9.m4oEZHuf6laVfw2f-DbZxlBrQBx54ttcMvA9vuBuoMY",
    },
  });

  return res.data.id;
}

export default async function Room({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const room = await getRoom(slug);
  return (
    <div>
      <h1>Room {slug}</h1>
      <ChatRoom id={room} />
    </div>
  );
}
