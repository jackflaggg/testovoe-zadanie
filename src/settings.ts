import {config} from "dotenv";
config()
export const Settings = {
    port: process.env.PORT || 5901,
    admin: process.env.ADMIN || 'rasul@rasul.com:230900',
}