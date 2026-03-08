// import 'dotenv/config'
// import { PrismaNeon } from "@prisma/adapter-neon";
// import { PrismaClient } from './generated/prisma/client.js';
// console.log(process.env.DATABASE_URL, process.env.DIRECT_URL)

// const adapter = new PrismaNeon({
//     connectionString: process.env.DATABASE_URL,  // pooled URL at runtime
// })

// export const prismaClient = new PrismaClient({ adapter });

import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL,
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter,
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;