import { AppError } from "../errors/AppError";
import { ErrorCode } from "../errors/ErrorCodes";

export const EMAIL_REGEX =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[^\s]{8,}$/;

export const PHONE_REGEX =
    /^\(\d{3}\) \d{3}-\d{4}$/;

export const USER_FIELD_LIMITS = {
    name: 100,
    email: 255,
    phone: 20,
    password: 128,
};

export function normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
}


export function normalizePhone(phone: string): string {
    const digits = phone.replace(/\D/g, "");

    if (digits.length !== 10) {
        throw new AppError(
            "Invalid phone number format",
            400,
            ErrorCode.INVALID_INPUT
        );
    }

    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
}


export function isValidEmail(email: string): boolean {
    return EMAIL_REGEX.test(normalizeEmail(email));
}

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
    return PHONE_REGEX.test(formatPhone(phone));
}


export function isValidPassword(password: string): boolean {
    return PASSWORD_REGEX.test(password);
}

export function validateSignupInput(input: {
    name: string;
    email: string;
    phone: string;
    password: string;
}) {

    if (input.name.length > USER_FIELD_LIMITS.name) {
        throw new AppError(
            "Name exceeds maximum length",
            400,
            ErrorCode.INVALID_INPUT
        );
    }

    if (input.email.length > USER_FIELD_LIMITS.email) {
        throw new AppError(
            "Email exceeds maximum length",
            400,
            ErrorCode.INVALID_INPUT
        );
    }

    if (input.phone.length > USER_FIELD_LIMITS.phone) {
        throw new AppError(
            "Phone number exceeds maximum length",
            400,
            ErrorCode.INVALID_INPUT
        );
    }

    if (input.password.length > USER_FIELD_LIMITS.password) {
        throw new AppError(
            "Password exceeds maximum length",
            400,
            ErrorCode.INVALID_INPUT
        );
    }

    if (!input.name.trim()) {
        throw new AppError(
            "Name is required",
            400,
            ErrorCode.INVALID_INPUT
        )
    }

    if (!isValidEmail(input.email)) {
        throw new AppError(
            "Invalid email format",
            400,
            ErrorCode.INVALID_INPUT
        )
    }

    if (!isValidPhone(input.phone)) {
        throw new AppError(
            "Invalid phone format",
            400,
            ErrorCode.INVALID_INPUT
        )
    }

    if (!isValidPassword(input.password)) {
        throw new AppError(
            "Password does not meet requirements",
            400,
            ErrorCode.INVALID_INPUT
        )
    }
}

export function validateLoginInput(input:{
    email:string;
    password:string;
}) {

    if (input.email.length > USER_FIELD_LIMITS.email) {
        throw new AppError(
            "Email exceeds maximum length",
            400,
            ErrorCode.INVALID_INPUT
        );
    }

    if (input.password.length > USER_FIELD_LIMITS.password) {
        throw new AppError(
            "Password exceeds maximum length",
            400,
            ErrorCode.INVALID_INPUT
        );
    }

    if(!isValidEmail(input.email)){
        throw new AppError(
            "Invalid email format",
            400,
            ErrorCode.INVALID_INPUT
        );
    }

}