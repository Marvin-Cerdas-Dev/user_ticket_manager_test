export interface User {
    id: number;
    fullName: string;
    email: string;
    role: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

