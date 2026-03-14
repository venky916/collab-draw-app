import { HTTP_BACKEND } from "@/config"
import axios from "axios"
type Shape = {
    type: "rect",
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: "circle",
    centerX: number,
    centerY: number,
    radius: number
}

let existingShapes: Shape[] = []

export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    existingShapes = await getExistingShapes(roomId)
    let clicked = false;
    let startX = 0;
    let startY = 0;
    ctx.fillStyle = "rgba(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log(existingShapes)
    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log(message)
        if (message.type === "chat") {
            // check the room id
            const parsedShape = JSON.parse(message.message) // ✅ parse the message field
            existingShapes.push(parsedShape)
            clearCanvas(existingShapes, canvas, ctx);
        }
    }


    clearCanvas(existingShapes, canvas, ctx);


    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    });

    canvas.addEventListener("mouseup", (e) => {
        clicked = false;

        const width = e.clientX - startX;
        const height = e.clientY - startY;

        const shape: Shape = {
            type: "rect",
            x: startX,
            y: startY,
            width,
            height
        }

        existingShapes?.push(shape)

        socket.send(JSON.stringify({ type: "chat", message: JSON.stringify(shape), roomId: roomId }));
    });

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            clearCanvas(existingShapes, canvas, ctx);
            ctx.strokeStyle = "rgba(255,255,255)";
            ctx.strokeRect(startX, startY, width, height);
        }
    });
}

function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(255,255,255)";


    existingShapes?.forEach((shape) => {
        if (shape.type === "rect") {
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape.type === "circle") {
            ctx.beginPath();
            ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, 2 * Math.PI);
            ctx.stroke();
        }
    });
}

async function getExistingShapes(roomId: string) {
    const response = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjYmM4NGVmYi05MjQ5LTRiNDgtODIyMy0wM2JlYTc3NzRlNTQiLCJpYXQiOjE3NzM0MjQyMTR9.4mXS_Hgj-CNlZYDFLbBILygEwbmisLhycZyCFJZqiE4",
        },
    })
    const messages = response.data;

    const shapes = messages?.map((x: { message: string }) => {
        const parsedData = JSON.parse(x.message);
        return parsedData;
    })

    return shapes
}