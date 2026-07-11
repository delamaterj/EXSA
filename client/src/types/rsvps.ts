export interface Rsvp {
    id: string;
    user_id?: string;
    name?: string;
    email?: string;
    phone?: string;
    event_date_id: string;
    created_at: string;
}

export interface CreateRsvpRequest {
    user_id?: string;
    name?: string;
    email?: string;
    phone?: string;
    event_date_id: string;
}

export interface CreateRsvpResponse {
    id: string;
}