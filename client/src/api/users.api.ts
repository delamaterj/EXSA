import {apiClient} from "./client";
import type {LoginRequest, 
LoginResponse,
SignupRequest,
SignupResponse} from "../types/users";

export async function loginUser(
    request: LoginRequest
): Promise<LoginResponse> {

    return apiClient<LoginResponse>(
        "/users/login",
        {
            method: "POST",
            body: JSON.stringify(request),
        }
    );
}

export async function signupUser(
    request: SignupRequest
): Promise<SignupResponse> {

    return apiClient<SignupResponse>(
        "/users/signup",
        {
            method: "POST",
            body: JSON.stringify(request),
        }
    );
}
