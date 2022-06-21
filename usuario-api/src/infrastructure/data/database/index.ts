import { PrismaClient } from "@prisma/client"

interface CustomNodeJsGlobal {
    prisma: PrismaClient
}

declare const global: CustomNodeJsGlobal

export const prismaClientFactory = (): PrismaClient => {
    try {
        const prisma = global.prisma || new PrismaClient();

        if (process.env.NODE_ENV === 'development')
            global.prisma = prisma

        return prisma;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default prismaClientFactory