import 'dotenv/config'
import cors from "cors"
import { WebSocketServer, WebSocket } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from '@repo/backend-common/config';
import { prisma } from "@repo/db"

const wss = new WebSocketServer({ port: 8080 });
interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}


const users: User[] = []

function CheckUser(token: string): string | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET)

        if (typeof decoded === "string") {
            return null
        }

        if (!decoded || !(decoded as JwtPayload).userId) {
            return null
        }

        return decoded?.userId
    } catch (error) {
        return null
    }

}

wss.on('connection', function connection(ws, request) {

    const url = request.url; // ws://localhost:3000?token=123123

    if (!url) {
        return
    }

    const queryParam = new URLSearchParams(url.split("?")[1]);
    const token = queryParam.get("token") || "";
    const userId = CheckUser(token)

    if (!userId) {
        ws.close()
        return null
    }

    //check if user exist
    // if (!users.find(user => user.userId === userId)) {
    // }

    users.push({ ws, rooms: [], userId })


    ws.on('message', async function message(data) {

        const parsedData = JSON.parse(data.toString())

        if (parsedData.type === "join_room") {
            const { roomId } = parsedData
            // const user = users.find(user => user.userId === userId)
            const user = users.find(user => user.ws === ws)
            if (!user) {
                return null
            }
            user.rooms.push(roomId)
        }

        if (parsedData.type === "leave_room") {
            const { roomId } = parsedData
            // const user = users.find(user => user.userId === userId)
            const user = users.find(user => user.ws === ws)
            if (!user) {
                return null
            }
            user.rooms = user.rooms.filter(room => room !== roomId)
        }

        if (parsedData.type === "chat") {
            const { message, roomId } = parsedData
            // const user = users.find(user => user.userId === userId)
            const user = users.find(user => user.ws === ws)
            if (!user) {
                return null
            }

            await prisma.chat.create({
                data: {
                    message,
                    roomId: Number(roomId),
                    userId
                }
            })
            console.log(typeof roomId, roomId, user.rooms)
            users.forEach(user => {
                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({ type: "chat", message, roomId }))
                }
            })
        }
    });

});