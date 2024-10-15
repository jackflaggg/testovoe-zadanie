import {LoggerServiceInterface} from "../models/logger.service.model";
import {ISettingsParam, Logger} from "tslog";
import {injectable} from "inversify"
import 'reflect-metadata'

@injectable()
export class LoggerService implements LoggerServiceInterface {
    public logger: Logger<unknown>;

    constructor() {
        this.logger = new Logger<unknown>({
            displayInstanceName: false,
            displayLoggerName: false,
            displayFilePath: 'hidden',
            displayFunctionName: false,
        } as ISettingsParam<unknown>);
    }
    log(...args: any[]) : void{
        this.logger.info(...args);
    };
    error(...args: any[]) : void{
        this.logger.error(...args);
    };
    warn(...args: any[]) : void{
        this.logger.warn(...args);
    };
}