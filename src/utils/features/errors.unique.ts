import {inject, injectable} from "inversify";
import {TYPES} from "../types/types";
import {LoggerServiceInterface} from "../../models/logger.service.model";
import {UserQueryRepository} from "../../repository/user/user-query-repository";
import {ErrorsType} from "../../models/errors.messages";
import {errUnique} from "../../models/err-unique-interface";

@injectable()
export class ErrorsUnique implements errUnique{
    constructor(@inject(TYPES.LoggerServiceInterface) private readonly loggerService: LoggerServiceInterface,
                @inject(TYPES.UserQueryRepository) private readonly userQueryRepository: UserQueryRepository,) {
    }
    async checkUnique(email: string){
        const errors: ErrorsType = {
            errorsMessages: []
        }

        const existingSupByEmail = await this.userQueryRepository.findByEmailSupplier(email);

        if (existingSupByEmail) {
            this.loggerService.log('[errorsUnique]')
            errors.errorsMessages.push({message: `не уникальный ${existingSupByEmail.email}`, field: "email"});
        }

        return errors.errorsMessages.length > 0 ? errors: false
    }

}