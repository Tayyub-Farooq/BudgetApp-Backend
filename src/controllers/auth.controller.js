import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const issueToken = (user) =>
  jwt.sign({ sub: user._id.toString(), email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      const err = new Error("email and password required");
      err.status = 400;
      throw err;
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      const err = new Error("Email already in use");
      err.status = 409;
      throw err;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ email: email.toLowerCase(), passwordHash });
    const token = issueToken(user);

    res.status(201).json({ token, user: { id: user._id, email: user.email } });
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      const err = new Error("email and password required");
      err.status = 400;
      throw err;
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      const err = new Error("Invalid credentials");
      err.status = 401;
      throw err;
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      const err = new Error("Invalid credentials");
      err.status = 401;
      throw err;
    }

    const token = issueToken(user);
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (e) {
    next(e);
  }
};

export const me = async (req, res, next) => {
  try {
    const { default: User } = await import("../models/User.js");
    const user = await User.findById(req.user.id).select("_id email createdAt");
    res.json({ user });
  } catch (e) {
    next(e);
  }
};
