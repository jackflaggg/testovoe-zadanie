import {Settings} from "../settings";
import {PrismaClient} from "@prisma/client";

export class PrismaService {
    client: PrismaClient
    constructor() {
        this.client = new PrismaClient()
    }

    async connect(): Promise<void> {
        try {

        } catch (err: unknown){
            if (err instanceof Error){

            }
        }
    }

    async disconnect(): Promise<void> {
        await this.client.$disconnect();
    }
}