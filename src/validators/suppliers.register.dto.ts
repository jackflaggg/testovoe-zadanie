import {IsEmail, IsString} from "class-validator";

export class SuppliersRegisterDto{
    @IsEmail({}, { message: 'Неверно указан email'})
    email: string;

    @IsString({ message: 'Не указано имя' })
    login: string;

    @IsString({ message: 'Не указан пароль' })
    password: string;

    constructor(login: string, email: string, password: string) {
        this.login = login;
        this.email = email;
        this.password = password;
    }
}
