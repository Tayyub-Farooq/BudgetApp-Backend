import { Router } from "express";
import authRequired from "../middleware/authRequired.js";
import { register, login, me } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authRequired, me);

export default router;
