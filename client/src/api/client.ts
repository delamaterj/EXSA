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
        throw new Error(
            data.error || "An unexpected error occurred."
        );
    }

    return data;
}