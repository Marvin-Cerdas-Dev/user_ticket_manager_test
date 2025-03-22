/**
 * Interface representing a user.
 */
export interface User {
    id: number;
    fullName: string;
    email: string;
    role: string;
}

/**
 * Interface representing a user for management purposes.
 */
export interface UserManage {
    _id: string;
    fullName: string;
    email: string;
    password?: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * Interface representing the response payload for a login request.
 */
export interface LoginResponse {
    user: User;
    token: string;
}

/**
 * Interface representing the request payload for a login request.
 */
export interface LoginRequest {
    email: string;
    password: string;
}