import {Logger} from "tslog";

export interface LoggerServiceInterface {
    logger: Logger<unknown>;
    log: (...args: any[]) => void;
    error: (...args: any[]) => void;
    warn: (...args: any[]) => void;
}