import {IsEmail, IsString} from "class-validator";

export class SuppliersRegisterDto{
    @IsEmail({}, { message: 'Неверно указан email'})
    email: string;

    @IsString({ message: 'Не указан пароль' })
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

export class SupplierUpdateDto{
    @IsString({ message: 'Не указан пароль' })
    password: string;

    constructor(password: string) {
        this.password = password;
    }
}