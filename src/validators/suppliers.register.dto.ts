import {IsEmail, IsString} from "class-validator";

export class SuppliersRegisterUserDto{
    @IsEmail({}, { message: 'Неверно указан email'})
    email: string;

    @IsString({ message: 'Не указан пароль' })
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

export class SupplierUpdateUserDto{
    @IsString({ message: 'Не указан пароль' })
    password: string;

    constructor(password: string) {
        this.password = password;
    }
}