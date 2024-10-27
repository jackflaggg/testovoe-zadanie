import {IsEmail, IsOptional, IsString} from "class-validator";

export class PromotionsCreateDto{
    @IsString({ message: 'Не указан title' })
    title: string;

    @IsString({ message: 'Не указан description' })
    description: string;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
    }
}

export class PromotionsUpdateDto{
    @IsEmail({}, { message: 'Неверно указан email'})
    @IsOptional()
    email?: string;

    @IsString({ message: 'Не указан пароль' })
    @IsOptional()
    password?: string;

    constructor(email?: string, password?: string) {
        this.email = email;
        this.password = password;
    }
}
