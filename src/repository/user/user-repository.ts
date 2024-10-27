import {UserRepoInterface} from "../../models/promotion.repository.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "../../utils/types/types";
import {PrismaService} from "../../db/db";
import {LoggerServiceInterface} from "../../models/logger.service.model";
import {CreateUserDto} from "../../models/UserRepository.models";

@injectable()
export class UserRepository implements UserRepoInterface {
    constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService,
                @inject(TYPES.LoggerServiceInterface) private logger: LoggerServiceInterface) {}
    async createUser(body: CreateUserDto)  {
        try {
            return await this.prismaService.client.userModel.create({
                data: {
                    email: body.email,
                    password: body.password,
                    role: body.role,
                }
            });
        } catch (err: unknown){
            this.logger.error('Возникла ошибка во время создания акции: ', err);
            return null;
        }
    }
    async updateUser(password: string, id: number) {
        try {
            return await this.prismaService.client.userModel.update({
                where: {id},
                data: {
                    password
                }
            });
        } catch (err: unknown){
            this.logger.error('Возникла ошибка во время обновления юзера: ', err);
            return null;
        }
    }
    async deleteUser(id: number) {
        try {
            return await this.prismaService.client.userModel.delete({
                where: {
                    id
                }
            });
        } catch (err: unknown){
            this.logger.error('Возникла ошибка во время удаления юзера: ', err);
            return null;
        }
    }
}