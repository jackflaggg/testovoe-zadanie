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
    email: string;

    @IsString({ message: 'Не указан пароль' })
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
