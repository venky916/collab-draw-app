import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema } from "@repo/common/types";
const app = express();

app.use(express.json());

app.post("/signup", (req, res) => {

    const { email, name, password } = req.body;

    // zod validation
    const data = CreateUserSchema.safeParse(req.body);

    if (!data.success) {
        return res.status(400).json({ message: data.error.message })
    }
    // check in db
    // if not in db add in db and send token


})

app.post("/signin", (req, res) => {

    const { email, password } = req.body;
    // zod validation
    // check in db
    // if in db -> send token
    const userId = 1;
    const token = jwt.sign({ userId }, JWT_SECRET)

    res.json({ token })
})


app.post("/room", middleware, (req, res) => {

    // middleware check authentication

    // if true-> create room and send room id and talk with ws-server fro creating room
    res.json({
        roomId: 123
    })
})

app.listen(3001, () => {
    console.log("HTTP server listening on port 3000");
});