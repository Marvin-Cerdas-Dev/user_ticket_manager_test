export interface User {
    id: number;
    fullName: string;
    email: string;
    role: string;
}

export interface UserManage {
    _id: string;
    fullName: string;
    email: string;
    password?: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

