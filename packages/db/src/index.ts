import 'dotenv/config'
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "./generated/prisma/client";

const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,  // pooled URL at runtime
})

export const prismaClient = new PrismaClient({ adapter });