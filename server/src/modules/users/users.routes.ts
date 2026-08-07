import express from "express";
import { register, login, update, deleteUser } from "./users.controller";
import { authenticate } from "../../middleware/authe.middleware";
import { loginLimiter, updateUserLimiter, deleteUserLimiter } from "../../middleware/ratelimiter";

const router = express.Router();

router.post("/signup", register);
router.post("/login", loginLimiter, login);
router.put("/update", updateUserLimiter, authenticate, update);
router.delete("/delete", deleteUserLimiter, authenticate, deleteUser);

export default router;