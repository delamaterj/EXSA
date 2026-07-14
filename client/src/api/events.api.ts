import {apiClient} from './client';
import type {CreateEventRequest, CreateEventResponse, EventRow} from '../types/events';

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

export async function getEvents(): Promise<EventRow[]> {

    return apiClient<EventRow[]>(
        "/events/get",
        {
            method: "GET",
        }
    );
}

export async function getEventId(
    eventId: string
): Promise<EventRow[]> {

    return apiClient<EventRow[]>(
        `/events/get/${eventId}`,
        {
            method: "GET",
        }
    );
}