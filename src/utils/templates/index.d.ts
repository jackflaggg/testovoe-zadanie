import {UserModel} from "@prisma/client";

declare global {
    namespace Express {
        export interface Request {
            userId?: UserModel | null | string
        }
    }
}