import { PrismaClient } from "@prisma/client"

interface CustomNodeJsGlobal {
    prisma: PrismaClient
}

declare const global: CustomNodeJsGlobal

function PrismaClientFactory(): PrismaClient {
    const prisma = global.prisma || new PrismaClient();

    if (process.env.NODE_ENV === 'development')
        global.prisma = prisma

    return prisma;
}

export default PrismaClientFactory