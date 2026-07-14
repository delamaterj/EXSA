/**
 * Utility functions for formatting and validating U.S. phone numbers.
 */

export const PHONE_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;

export function formatPhone(value: string): string {
    const digits = value.replace(/\D/g, "");

    if (digits.length <= 3) {
        return digits;
    }

    if (digits.length <= 6) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

export function isValidPhone(phone: string): boolean {
    return PHONE_REGEX.test(phone);
}

export function normalizePhone(phone: string): string {
    return phone.replace(/\D/g, "");
}