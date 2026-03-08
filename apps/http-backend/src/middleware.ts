import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
export function middleware(req: Request, res: Response, next: NextFunction) {

    // decode token and check in db if user exist
    console.log("headers:", req.headers)
    console.log("auth header:", req.headers.authorization)

    const token = req.headers.authorization ?? "";
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded,token)

    if (decoded) {
        // @ts-ignore
        req.userId = decoded.userId

        next()
    } else {
        res.status(403).json({ message: "unauthorized" })
    }
}