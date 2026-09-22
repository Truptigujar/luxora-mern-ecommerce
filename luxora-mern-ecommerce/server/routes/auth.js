const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || "luxora_super_secret_change_this", {
    expiresIn: "7d",
  });

// @route  POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = User.findUser({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const user = await User.createUser({ name, email, password });
    const token = signToken(user._id);
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route  POST /api/auth/login
// Demo-friendly login: no password required. Any name + email combination
// logs straight in — new emails create an account on the fly, existing
// emails are simply logged back into their saved account.
router.post("/login", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Please enter an email address" });
    }

    let user = User.findUser({ email: email.toLowerCase().trim() });
    let isNewUser = false;

    if (!user) {
      const displayName = name && name.trim() ? name.trim() : email.split("@")[0];
      user = await User.createUser({ name: displayName, email: email.trim() });
      isNewUser = true;
    } else if (name && name.trim() && name.trim() !== user.name) {
      // Let returning users update their display name just by typing a new one.
      user.name = name.trim();
      User.saveUser(user);
    }

    const token = signToken(user._id);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
      isNewUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
