// Order model — talks to the local JSON database (see config/store.js).
// Every function here does one simple thing, so it's easy to follow.

const { createCollectionAPI } = require("../config/store");

const collection = createCollectionAPI("orders");

function createOrder(payload) {
  return collection.create(payload);
}

function findOrdersByUser(userId) {
  return collection.find({ user: userId });
}

function findOrderById(id) {
  return collection.findById(id);
}

module.exports = { createOrder, findOrdersByUser, findOrderById };
