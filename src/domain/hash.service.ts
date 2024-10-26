import bcrypt from 'bcrypt'
import {inject, injectable} from "inversify";
import {TYPES} from "../utils/types/types";
import {LoggerServiceInterface} from "../models/logger.service.model";
import {HashServiceInterface} from "../models/hash.service.model";

@injectable()
export class HashService implements HashServiceInterface {
    constructor(@inject(TYPES.LoggerServiceInterface) private readonly logger: LoggerServiceInterface) {
    }
    async _generateHash(password: string, saltRounds: number = 10): Promise<string | null> {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            return await bcrypt.hash(password, salt);
        } catch (err: unknown) {
            this.logger.error(err);
            return null;
        }
    }
    async comparePassword(password: string, hash: string): Promise<boolean | null>{
        try {
            return await bcrypt.compare(password, hash);
        } catch (err: unknown) {
            this.logger.error(err);
            return null;
        }
    }
}