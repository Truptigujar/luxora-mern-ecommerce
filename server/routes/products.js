const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// @route  GET /api/products?category=shoes&gender=men
router.get("/", async (req, res) => {
  try {
    const { category, gender } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (gender) filter.gender = gender;

    const products = Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route  GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route  POST /api/products  (admin/demo use - create a product)
router.post("/", async (req, res) => {
  try {
    const product = Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
