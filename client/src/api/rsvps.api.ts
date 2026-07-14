import {apiClient} from './client';
import type { CreateRsvpRequest, CreateRsvpResponse } from '../types/rsvps';

export async function createRsvp(
    request: CreateRsvpRequest
): Promise<CreateRsvpResponse> {

    return apiClient<CreateRsvpResponse>(
        `/rsvps`,
        {
            method: "POST",
            body: JSON.stringify(request),
        }
    );
}