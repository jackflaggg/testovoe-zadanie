export interface AdminModel {
    email:     string,
    password:  string,
    role:      string, // "ADMIN" или "SUPPLIER"
    createdAt: string,
    updatedAt: string,
}