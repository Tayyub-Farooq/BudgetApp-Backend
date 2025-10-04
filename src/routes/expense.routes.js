import { Router } from "express";
import authRequired from "../middleware/authRequired.js";
import {
  createExpense,
  listExpenses,
  summaryByCategory,
  updateExpense,
  deleteExpense
} from "../controllers/expense.controller.js"; 

const router = Router();

router.use(authRequired);
router.post("/", createExpense);
router.get("/", listExpenses);
router.get("/summary", summaryByCategory);
router.patch("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
