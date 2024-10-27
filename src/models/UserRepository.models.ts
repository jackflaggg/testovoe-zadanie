export interface CreateUserDto {
    email: string;
    password: string;
    role: string; // "ADMIN" или "SUPPLIER"
}