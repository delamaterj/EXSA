export interface Rsvp {
    id: string;
    user_id?: string;
    name?: string;
    email?: string;
    phone?: string;
    event_date_ids: string[];
}

export interface CreateRsvpRequest {
    user_id?: string;
    name: string;
    email: string;
    phone: string;
    event_date_ids: string[];
}

export interface CreateRsvpResponse {
    message: string;
    rsvps: string[];
}