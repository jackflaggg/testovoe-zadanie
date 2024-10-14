import { PrismaClient, User } from '@prisma/client'


const prisma = new PrismaClient();

export class App {
    async init () {
        await prisma.$connect();
        await prisma.user.count()
    }
}

const app = new App();
app.init()