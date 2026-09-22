const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// @route  POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ message: "Please enter your name" });
    if (!email || !EMAIL_RE.test(email.trim())) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }
    if (!message || !message.trim()) return res.status(400).json({ message: "Please enter a message" });

    ContactMessage.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject && subject.trim() ? subject.trim() : "General Inquiry",
      message: message.trim(),
    });
    res.status(201).json({ message: "Thanks for reaching out — we'll get back to you shortly." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
