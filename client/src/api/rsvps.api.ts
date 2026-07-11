import {apiClient} from './client';
import type { CreateRsvpRequest, CreateRsvpResponse } from '../types/rsvps';

export async function createRsvp(
    eventId: string,
    request: CreateRsvpRequest
): Promise<CreateRsvpResponse> {

    return apiClient<CreateRsvpResponse>(
        `/events/${eventId}/rsvps`,
        {
            method: "POST",
            body: JSON.stringify(request),
        }
    );
}