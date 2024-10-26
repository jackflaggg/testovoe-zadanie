import {config} from "dotenv";
config()
export const Settings = {
    port: process.env.PORT || 5901,
    admin: process.env.ADMIN!,
    tokenDuration: process.env.TOKEN_DURATION!,
    secretKey: process.env.SECRET_KEY!,
}