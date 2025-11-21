import { Router } from "express";
import authRouter from "./auth.routes.js";         
import expenseRouter from "./expense.routes.js";
import cardRouter from "./card.routes.js";
const router = Router();

router.use("/auth", authRouter);
router.use("/expenses", expenseRouter);
router.use("/cards", cardRouter);  
export default router;
