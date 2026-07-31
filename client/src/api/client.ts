import { ApiError } from "../types/ApiError";

const API_URL = import.meta.env.VITE_API_URL;

export async function apiClient<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {

    const token = localStorage.getItem("token");

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token && {
            Authorization: `Bearer ${token}`,
        }),
        ...options.headers,
    };

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers,
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new ApiError(
        data.message ?? "An unexpected error occurred.",
        data.code ?? "UNKNOWN_ERROR",
        response.status
    );
    }

    return data;
}