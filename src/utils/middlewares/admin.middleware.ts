import {IsEmail, IsString} from "class-validator";

export class AdminLoginDto{

    @IsEmail({}, { message: 'Неверно указан email'})
    email: string;

    @IsString({ message: 'Не указан пароль' })
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}