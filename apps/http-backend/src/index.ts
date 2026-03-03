import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { middleware } from "./middleware";

const app = express();

app.use(express.json());

app.post("/signup", (req, res) => {

    const { email, name, password } = req.body;

    // zod validation
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