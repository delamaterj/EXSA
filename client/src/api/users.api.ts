import {apiClient} from "./client";
import type {LoginRequest, 
LoginResponse,
SignupRequest,
SignupResponse,
UpdateUserRequest,
UpdateUserResponse} from "../types/users";

export async function signupUser(
    request: SignupRequest
): Promise<SignupResponse> {

    return apiClient<SignupResponse>(
        "/users/signup",
        {
            method: "POST",
            body: JSON.stringify(request)
        }
    );
}

export async function loginUser(
    request: LoginRequest
): Promise<LoginResponse> {

    return apiClient<LoginResponse>(
        "/users/login",
        {
            method: "POST",
            body: JSON.stringify(request)
        }
    );
}

export async function updateUser(
    request: UpdateUserRequest
): Promise<UpdateUserResponse> {

    return apiClient<UpdateUserResponse>(
        "/users/update",
        {
            method: "PUT",
            body: JSON.stringify(request)
        }
    )
}
