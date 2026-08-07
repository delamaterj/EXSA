import { Router } from "express";
import { verifyEmailController } from "./emailVerification.controller";

const router = Router();

router.get(
    "/verify-email",
    verifyEmailController
);

export default router;