import { Router } from "express";
import authRequired from "../middleware/authRequired.js";
import {
  createCard,
  listCards,
  deleteCard,
  cardsDueTomorrow,
} from "../controllers/card.controller.js";

const router = Router();

router.use(authRequired);

router.post("/", createCard);
router.get("/", listCards);
router.get("/alerts", cardsDueTomorrow);
router.delete("/:id", deleteCard);

export default router;
