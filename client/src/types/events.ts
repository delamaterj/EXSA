export interface EventDate {
    id: string;
    starts_at: string;
}


export interface Event {
    id: string;
    title: string;
    description?: string;
    location: string;
    flyer_url?: string;
    dates: EventDate[];
}


export interface CreateEventRequest {
    title: string;
    location: string;
    dates: string[];
    description?: string;
    flyer_url?: string;
}


export interface CreateEventResponse {
    eventId: string;
}


export interface EventRow {
    id: string;
    title: string;
    location: string;
    description?: string;
    flyer_url?: string;

    date_id: string;
    date: string;

}

export interface CalendarEvent {
    id: string;
    title: string;
    location: string;
    description?: string;
    flyer_url?: string;
    dates: string[];
}

export type EventsByDate = Record<string, CalendarEvent[]>;

export type GetEventsResponse = Event[];

export type GetEventIDResponse = Event;