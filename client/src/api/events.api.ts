import {apiClient} from './client';
import type {CreateEventRequest, CreateEventResponse} from '../types/events';

export async function createEvent(
    request: CreateEventRequest
): Promise<CreateEventResponse> {

    return apiClient<CreateEventResponse>(
        "/events",
        {
            method: "POST",
            body: JSON.stringify(request),
        }
    );
}

export async function getEvents(): Promise<Event[]> {

    return apiClient<Event[]>(
        "/events",
        {
            method: "GET",
        }
    );
}

export async function getEventId(
    eventId: string
): Promise<Event> {

    return apiClient<Event>(
        `/events/${eventId}`,
        {
            method: "GET",
        }
    );
}