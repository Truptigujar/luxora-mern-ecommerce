const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const auth = require("../middleware/auth");

// @route  GET /api/cart  (get current user's cart)
router.get("/", auth, async (req, res) => {
  try {
    let cart = Cart.findCartByUser(req.userId);
    if (!cart) cart = Cart.createCart(req.userId);

    Cart.populateCart(cart);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route  POST /api/cart  (add item)  body: { productId, quantity }
router.post("/", auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    let cart = Cart.findCartByUser(req.userId);
    if (!cart) cart = Cart.createCart(req.userId);

    const existingItem = cart.items.find((item) => item.product === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    Cart.saveCart(cart);
    Cart.populateCart(cart);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route  PUT /api/cart/:productId  (update quantity)
router.put("/:productId", auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = Cart.findCartByUser(req.userId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((item) => item.product === req.params.productId);
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    item.quantity = quantity;
    Cart.saveCart(cart);
    Cart.populateCart(cart);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route  DELETE /api/cart/:productId
router.delete("/:productId", auth, async (req, res) => {
  try {
    const cart = Cart.findCartByUser(req.userId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.product !== req.params.productId);
    Cart.saveCart(cart);
    Cart.populateCart(cart);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
