CREATE TABLE rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    event_date_id UUID NOT NULL REFERENCES event_dates(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (name, email, phone, event_date_id)
);