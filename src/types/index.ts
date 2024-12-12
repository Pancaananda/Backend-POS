// backend/src/types/index.ts

export interface User {
    id: string;
    username: string;
    email: string;
    password: string; // Note: In a real application, do not store passwords in plain text
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
}

export interface Order {
    id: string;
    userId: string;
    productIds: string[];
    totalAmount: number;
    createdAt: Date;
}

export interface AuthResponse {
    token: string;
    user: User;
}