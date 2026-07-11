export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email: string): string {
    return email.trim();
}

export function isValidEmail(email: string): boolean {
    return EMAIL_REGEX.test(normalizeEmail(email));
}