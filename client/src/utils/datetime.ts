import {DateTime} from 'luxon';
import type {EventDate} from '../types/events';

export const APP_TIMEZONE = "America/Chicago";

export function toUTC(localDateTime: string): string {
    return DateTime.fromISO(localDateTime, {
        zone: APP_TIMEZONE,
    })
        .toUTC()
        .toISO()!;
}

export function toCentral(utcDateTime: string): DateTime {
    return DateTime.fromISO(utcDateTime, {
        zone: "utc",
    }).setZone(APP_TIMEZONE);
}

export function formatEventDate(date: string): string {
    return toCentral(date).toLocaleString(
        DateTime.DATETIME_FULL
    );
}

export function isUpcomingDate(date: string): boolean {
    return toCentral(date) >= DateTime.now().setZone(APP_TIMEZONE);
}

export function sortAscendingEventDates(
    dates: EventDate[]
): EventDate[] {

    return [...dates].sort(
        (a, b) =>
            DateTime.fromISO(a.starts_at).toMillis() -
            DateTime.fromISO(b.starts_at).toMillis()
    );
}

export function sortDescendingEventDates(
    dates: EventDate[]
): EventDate[] {

    return [...dates].sort(
        (a, b) =>
            DateTime.fromISO(b.starts_at).toMillis() -
            DateTime.fromISO(a.starts_at).toMillis()
    );
}

export function getCalendarDateKey(date: string | Date): string {
    const value = typeof date === "string"
        ? new Date(date)
        : date;

    return value.toLocaleDateString("en-CA", {
        timeZone: APP_TIMEZONE,
    });
}

export function hasUpcomingDates(
    dates: EventDate[]
): boolean {

    return dates.some((date) =>
        isUpcomingDate(date.starts_at)
    );
}

export function hasPastDates(
    dates: EventDate[]
): boolean {

    return dates.some(
        (date) => !isUpcomingDate(date.starts_at)
    );

}

export function getUpcomingDates( 
    dates: EventDate[] 
): EventDate[] { 
    return dates.filter((date) => isUpcomingDate(date.starts_at) ); 
}