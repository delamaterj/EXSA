import express from "express";
import {createRSVP} from "./rsvps.controller";

const router = express.Router();

router.post("/", createRSVP);

export default router;