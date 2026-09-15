import { resetPasswordController, requestPasswordResetController } from "./passwordReset.controller";
import express from "express";

const router = express.Router();

router.post("/reset-password", resetPasswordController);
router.post("/forgot-password", requestPasswordResetController);

export default router;