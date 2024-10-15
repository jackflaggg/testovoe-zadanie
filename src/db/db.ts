import {PrismaClient} from "@prisma/client";
import {inject, injectable} from "inversify";
import {TYPES} from "../utils/types/types";
import {LoggerServiceInterface} from "../models/logger.service.model";

@injectable()
export class PrismaService {
    client: PrismaClient
    constructor(
        @inject(TYPES.LoggerServiceInterface) private logger: LoggerServiceInterface,
    ) {
        this.client = new PrismaClient()
    }

    async connect(): Promise<void> {
        try {
            await this.client.$connect();
            this.logger.log('[PrismaService] Успешно подключились к базе данных!')
        } catch (err: unknown){
            if (err instanceof Error){
                this.logger.error(`[PrismaService] ошибка подключения к базе данных: ${err.message}`);
                await this.disconnect();
            }
            this.logger.error(`[PrismaService] неизвестная ошибка подключения к базе данных: ${String(err)}`);
            await this.disconnect();
        }
    }

    async disconnect(): Promise<void> {
        await this.client.$disconnect();
    }
}