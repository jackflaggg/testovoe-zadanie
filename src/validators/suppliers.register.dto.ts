import {IsEmail, IsString} from "class-validator";

export class SuppliersRegisterDto{
    @IsEmail({}, { message: 'Неверно указан email'})
    email: string;

    @IsString({ message: 'Не указано имя' })
    name: string;

    @IsString({ message: 'Не указан пароль' })
    password: string;

    constructor(email: string, name: string, password: string) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
}
