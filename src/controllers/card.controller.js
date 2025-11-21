import Card from "../models/Card.js";

/**
 * POST /api/cards
 */
export const createCard = async (req, res, next) => {
  try {
    const { cardName, cardNumber, paymentDay, note } = req.body || {};
    if (!cardName || !cardNumber || !paymentDay) {
      const err = new Error("cardName, cardNumber, paymentDay required");
      err.status = 400;
      throw err;
    }

    const paymentDayNum = Number(paymentDay);
    if (paymentDayNum < 1 || paymentDayNum > 31 || Number.isNaN(paymentDayNum)) {
      const err = new Error("paymentDay must be between 1 and 31");
      err.status = 400;
      throw err;
    }

    const last4 = cardNumber.slice(-4);

    const card = await Card.create({
      userId: req.user.id,
      cardName,
      cardNumberLast4: last4,
      paymentDay: paymentDayNum,
      note,
    });

    res.status(201).json({ card });
  } catch (e) {
    next(e);
  }
};

/**
 * GET /api/cards
 */
export const listCards = async (req, res, next) => {
  try {
    const cards = await Card.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ cards });
  } catch (e) {
    next(e);
  }
};

/**
 * DELETE /api/cards/:id
 */
export const deleteCard = async (req, res, next) => {
  try {
    const result = await Card.deleteOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (result.deletedCount === 0) {
      const err = new Error("Not found");
      err.status = 404;
      throw err;
    }
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

/**
 * GET /api/cards/alerts
 * Cards with payment day = tomorrow's day-of-month.
 */
export const cardsDueTomorrow = async (req, res, next) => {
  try {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const tomorrowDay = tomorrow.getDate(); // local day-of-month

    const cards = await Card.find({
      userId: req.user.id,
      paymentDay: tomorrowDay,
    });

    res.json({ cards, tomorrowDay });
  } catch (e) {
    next(e);
  }
};
