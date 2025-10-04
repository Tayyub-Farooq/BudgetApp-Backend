import Expense from "../models/Expense.js";

export const createExpense = async (req, res, next) => {
  try {
    const { category, amount, occurredOn, note } = req.body || {};
    if (!category || amount == null || !occurredOn) {
      const err = new Error("category, amount, occurredOn required");
      err.status = 400;
      throw err;
    }
    const expense = await Expense.create({
      userId: req.user.id,
      category,
      amount,
      occurredOn: new Date(occurredOn),
      note
    });
    res.status(201).json({ expense });
  } catch (e) {
    next(e);
  }
};

export const listExpenses = async (req, res, next) => {
  try {
    const { month } = req.query;
    const filter = { userId: req.user.id };

    if (month) {
      const [y, m] = month.split("-").map(Number);
      const start = new Date(Date.UTC(y, m - 1, 1));
      const end = new Date(Date.UTC(y, m, 1));
      filter.occurredOn = { $gte: start, $lt: end };
    }

    const expenses = await Expense.find(filter).sort({ occurredOn: -1 });
    res.json({ expenses });
  } catch (e) {
    next(e);
  }
};

export const summaryByCategory = async (req, res, next) => {
  try {
    const { month } = req.query;
    const userId = req.user.id;

    const match = { userId: Expense.schema.path("userId").cast(userId) };
    if (month) {
      const [y, m] = month.split("-").map(Number);
      const start = new Date(Date.UTC(y, m - 1, 1));
      const end = new Date(Date.UTC(y, m, 1));
      match.occurredOn = { $gte: start, $lt: end };
    }

    const summary = await Expense.aggregate([
      { $match: match },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $project: { category: "$_id", total: 1, _id: 0 } },
      { $sort: { category: 1 } }
    ]);

    res.json({ summary });
  } catch (e) {
    next(e);
  }
};

export const updateExpense = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const update = {};
    for (const k of ["category", "amount", "occurredOn", "note"]) {
      if (k in req.body) update[k] = k === "occurredOn" ? new Date(req.body[k]) : req.body[k];
    }

    const expense = await Expense.findOneAndUpdate(
      { _id, userId: req.user.id },
      { $set: update },
      { new: true }
    );
    if (!expense) {
      const err = new Error("Not found");
      err.status = 404;
      throw err;
    }
    res.json({ expense });
  } catch (e) {
    next(e);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const result = await Expense.deleteOne({ _id: req.params.id, userId: req.user.id });
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
