import 'dotenv/config'
import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import { createRoomSchema, CreateUserSchema, SignInSchema } from "@repo/common/types";
import { prisma } from "@repo/db"

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {

    // const { email, name, password } = req.body;
    // console.log(email,name,password)

    // zod validation
    const parsedData = CreateUserSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({ message: parsedData.error.message })
    }
    // check in db
    // console.log(parsedData)
    try {
        const user = await prisma.user.create({
            data: {
                email: parsedData.data.email,
                name: parsedData.data.name,
                // Todo hash password
                password: parsedData.data.password
            }
        })
        console.log(user)
        res.json({
            token: jwt.sign({ userId: user?.id }, JWT_SECRET)
        })
    } catch (error) {
        res.status(411).json({
            message: error
        })
    }

    // if not in db add in db and send token
})

app.post("/signin", async (req, res) => {

    // const { email, password } = req.body;
    // zod validation
    const parsedData = SignInSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ message: parsedData.error.message })
    }
    // check in db
    // if in db -> send token
    const user = await prisma.user.findUnique({
        where: {
            email: parsedData.data.email,
            password: parsedData.data.password
        }
    })
    console.log(user)
    if (!user) {
        return res.status(403).json({ message: "unauthorized" })
    }
    const token = jwt.sign({ userId: user?.id }, JWT_SECRET)

    res.json({ token })
})


app.post("/room", middleware, async (req, res) => {

    // middleware check authentication
    const parsedData = createRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ message: parsedData.error.message })
    }

    // @ts-ignore
    const userId = req?.userId

    try {
        const room = await prisma.room.create({
            data: {
                slug: parsedData.data.roomName,
                adminId: userId
            }
        })

        // if true-> create room and send room id and talk with ws-server fro creating room
        res.json({
            roomId: room.id
        })
    } catch (error) {
        res.status(411).json({
            message: error
        })
    }

})

app.get("/chats/:id", middleware, async (req, res) => {

    const roomId = Number(req.params.id)
    console.log(roomId)

    const messages = await prisma.chat.findMany({
        where: {
            roomId: roomId
        },
        orderBy: {
            id: "desc"
        },
        take: 50
    })

    res.json(messages)

})

app.listen(3001, () => {
    console.log("HTTP server listening on port 3000");
});