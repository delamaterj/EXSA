export const VERIFICATION_TOKEN_REGEX = /^[a-f0-9]{64}$/;

export function isValidVerificationToken(token: string): boolean {
    return VERIFICATION_TOKEN_REGEX.test(token);
}