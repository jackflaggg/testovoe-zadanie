import {UserModel} from "@prisma/client";

export interface AdminModel {
    email:     string,
    password:  string,
    role:      'ADMIN' | 'SUPPLIER',
    createdAt: Date,
    updatedAt: Date,
}

export interface PromotionModel {
    id: number;
    title: string;
    description: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
    supplierId: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    supplier: UserModel;
}