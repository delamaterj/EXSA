import type { AuthUser } from "../types/users";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export function saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
}

export function saveUser(user: AuthUser): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): AuthUser | null {
    const user = localStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;
}

export function removeUser(): void {
    localStorage.removeItem(USER_KEY);
}

export function clearSession(): void {
    removeToken();
    removeUser();
}