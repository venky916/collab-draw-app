import { useEffect, useState } from "react"
import { WS_URL } from "../app/config";

export const useSocket = () => {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket | null>(null);


    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjYmM4NGVmYi05MjQ5LTRiNDgtODIyMy0wM2JlYTc3NzRlNTQiLCJpYXQiOjE3NzMxNTk4NDl9.m4oEZHuf6laVfw2f-DbZxlBrQBx54ttcMvA9vuBuoMY`);

        ws.onopen = () => {
            console.log("connected to server");
            setLoading(false);
            setSocket(ws);
        }
    }, [])

    return {
        loading,
        socket
    }

}