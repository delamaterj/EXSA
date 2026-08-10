export interface SignupRequest {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
}

export interface LoginResponse {
    token: string;
    user: AuthUser;
}

export interface SignupResponse {
    message: string;
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
}

export interface Credential {
    type: string;
    value: string;
}

export interface UpdateUserRequest {
    userId: string;
    credential: Credential;
}

export interface UpdateUserResponse {
    name?: string;
    email?: string;
    phone?: string;
}

export interface DeleteUserResponse {
    message: string;
}