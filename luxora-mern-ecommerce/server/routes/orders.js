const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");

// @route  POST /api/orders  (place an order)
// body: { items: [{ productId, name, price, image, quantity }], shipping: {...}, paymentMethod, total }
router.post("/", auth, async (req, res) => {
  try {
    const { items, shipping, paymentMethod, total } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }
    if (
      !shipping ||
      !shipping.name ||
      !shipping.address ||
      !shipping.city ||
      !shipping.pincode ||
      !shipping.phone
    ) {
      return res.status(400).json({ message: "Please fill in all required shipping details" });
    }
    const validPaymentMethods = ["cod", "card", "upi"];
    if (!validPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({ message: "Please select a payment method" });
    }

    const order = Order.createOrder({
      user: req.userId,
      items,
      shipping,
      paymentMethod,
      total,
      status: "confirmed",
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route  GET /api/orders  (this user's order history)
router.get("/", auth, async (req, res) => {
  try {
    const orders = Order.findOrdersByUser(req.userId);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route  GET /api/orders/:id  (a single order — used on the confirmation page)
router.get("/:id", auth, async (req, res) => {
  try {
    const order = Order.findOrderById(req.params.id);
    if (!order || order.user !== req.userId) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
