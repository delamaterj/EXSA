import express from "express";
import { register, login, update, deleteUser } from "./users.controller";
import { authenticate } from "../../middleware/authe.middleware";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.put("/update", authenticate, update);
router.delete("/delete", authenticate, deleteUser);

export default router;