// Cart model — talks to the local JSON database (see config/store.js).
// Every function here does one simple thing, so it's easy to follow.

const { createCollectionAPI } = require("../config/store");
const Product = require("./Product");

const collection = createCollectionAPI("carts");

function findCartByUser(userId) {
  return collection.findOne({ user: userId });
}

function createCart(userId) {
  return collection.create({ user: userId, items: [] });
}

// Saves any changes made to a cart (added item, updated quantity, etc).
function saveCart(cart) {
  collection.replaceOrInsert(cart);
  return cart;
}

// Replaces each item's plain product ID with the full product details
// (name, price, image...), so the frontend has everything it needs to
// display the cart without a second lookup.
function populateCart(cart) {
  cart.items = cart.items.map((item) => {
    const product = Product.findById(item.product);
    return { ...item, product: product || item.product };
  });
  return cart;
}

module.exports = { findCartByUser, createCart, saveCart, populateCart };
