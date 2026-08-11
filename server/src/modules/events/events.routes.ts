import express from "express";
import {createEvent,
    getEventInfoId,
    getEventsInfo} from "./events.controller";
import {authenticate} from "../../middleware/authe.middleware";
import {authorizeAdmin} from "../../middleware/authoadmin.middleware";
import {createEventLimiter} from "../../middleware/ratelimiter";

const router = express.Router();

//router.get("/feed", authenticate, getEventFeed);
router.post("/", createEventLimiter, authenticate, authorizeAdmin, createEvent);
router.get("/get", getEventsInfo);
router.get("/get/:eventId", getEventInfoId);

export default router;