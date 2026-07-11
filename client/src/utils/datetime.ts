import {DateTime} from 'luxon';

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

export function sortAscendingDates(
    dates: string[]
): string[] {
    return [...dates].sort(
        (a, b) =>
            DateTime.fromISO(a).toMillis() -
            DateTime.fromISO(b).toMillis()
    );
}

export function sortDescendingDates(
    dates: string[]
): string[] {
    return [...dates].sort(
        (a, b) =>
            DateTime.fromISO(b).toMillis() -
            DateTime.fromISO(a).toMillis()
    );
}

