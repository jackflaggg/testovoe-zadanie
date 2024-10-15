import { PrismaClient, User } from '@prisma/client'
import {Settings} from "./settings";


const prisma = new PrismaClient();

export class App {
    async init () {
        const connectDB = await prisma.$connect();
        // await prisma.post.findFirst({
        //     where: {
        //         title: ''
        //     }
        // });
        // await prisma.post.findUnique({
        //     where: {
        //         id: 1,
        //     }
        // });
        // await prisma.user.findMany({
        //     where: {
        //         id: {
        //             gte: 1
        //         }
        //     }
        // });
        // await prisma.post.findMany({
        //     where: {
        //         tags: {
        //             some: {
        //                 tag: {
        //                     name: 'my tah'
        //                 }
        //             }
        //         }
        //     }
        // });
        // await prisma.$queryRaw`SELECT * FROM "posts"`
    }
}
const bootstrap = async () => {
    await connectToDB(Number(Settings.port))
}
const app = new App();
app.init()