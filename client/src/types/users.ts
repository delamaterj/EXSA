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
    email: string;
    role: string;
}

export interface LoginResponse {
    token: string;
    user: AuthUser;
}

export interface SignupResponse {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
}