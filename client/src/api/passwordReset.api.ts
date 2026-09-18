import { apiClient } from "./client";
import type {
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
} from "../types/passwordReset";

export async function requestPasswordReset(
    request: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> {
    return apiClient<ForgotPasswordResponse>(
        "/api/forgot-password",
        {
            method: "POST",
            body: JSON.stringify(request)
        }
    );
}

export async function resetPassword(
    request: ResetPasswordRequest
): Promise<ResetPasswordResponse> {
    return apiClient<ResetPasswordResponse>(
        "/api/reset-password",
        {
            method: "POST",
            body: JSON.stringify(request)
        }
    );
}