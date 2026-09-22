const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// @route  POST /api/newsletter/subscribe
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !EMAIL_RE.test(email.trim())) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }
    const normalized = email.trim().toLowerCase();
    const existing = await Subscriber.findOne({ email: normalized });
    if (existing) {
      return res.json({ message: "You're already subscribed — thank you!" });
    }
    Subscriber.create({ email: normalized });
    res.status(201).json({ message: "Subscribed! Watch your inbox for exclusive offers." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
