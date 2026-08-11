import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,

    message: {
        message: "Too many login attempts. Please try again in 15 minutes."
    }
});

export const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,

    message: {
        message: "Too many signup attempts. Please try again in 1 hour."
    }
});

export const updateUserLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,

    message: {
        message: "Too many profile edits. Please try again in 15 minutes."
    }
});

export const deleteUserLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,

    message: {
        message: "Too many deletions. Please try again in 1 hour."
    }
});

export const createEventLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,

    message: {
        message: "Too many event uploads. Please try again in 15 minutes."
    }
});

export const createRSVPLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,

    message: {
        message: "Too many rsvps. Please try again in 15 minutes."
    }
});