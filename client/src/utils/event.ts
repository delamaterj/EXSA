import type {CalendarEvent,
EventRow,
EventsByDate,
Event, EventDate} from "../types/events";
import { getCalendarDateKey } from "./datetime";

export function groupEvents(
    rows: EventRow[]
): CalendarEvent[] {

    const grouped: Record<string, CalendarEvent> = {};

    rows.forEach((row) => {

        if (!grouped[row.id]) {
            grouped[row.id] = {
                id: row.id,
                title: row.title,
                location: row.location,
                description: row.description,
                flyer_url: row.flyer_url,
                dates: [],
            };
        }

        if (row.date) {
            grouped[row.id].dates.push(row.date);
        }

    });

    return Object.values(grouped);
}

export function buildCalendarMap(
    events: CalendarEvent[]
): EventsByDate {

    const map: EventsByDate = {};

    events.forEach((event) => {

    const seenDays = new Set<string>();

    event.dates.forEach((date) => {

        const key = getCalendarDateKey(date);

        if (seenDays.has(key)) {
            return;
        }

        seenDays.add(key);

        if (!map[key]) {
            map[key] = [];
        }

        map[key].push(event);

    });

});

    return map;
}

export function groupSingleEvent(rows: EventRow[]) : Event {

    if (rows.length === 0) {
        throw new Error("Cannot group an empty event.");
    }

    const first = rows[0];

    return {
        id: first.id,
        title: first.title,
        location: first.location,
        description: first.description,
        flyer_url: first.flyer_url,
        dates: rows.map((row) => ({
            id: row.date_id,
            starts_at: row.date
        }))
    };
}

export function groupEventsHome(
    rows: EventRow[]
): Event[] {

    const grouped = new Map<string, Event>();

    rows.forEach((row) => {

        if (!grouped.has(row.id)) {

            grouped.set(row.id, {
                id: row.id,
                title: row.title,
                location: row.location,
                description: row.description,
                flyer_url: row.flyer_url,
                dates: [],
            });

        }

        if (row.date_id && row.date) {

            const eventDate: EventDate = {
                id: row.date_id,
                starts_at: row.date,
            };

            grouped.get(row.id)!.dates.push(eventDate);

        }

    });

    return [...grouped.values()];

}