import { z } from "zod";

export const CreateUserSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string(),
    password: z.string(),
})


export const SignInSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export const createRoomSchema = z.object({
    roomName: z.string().min(3).max(20),
    
})