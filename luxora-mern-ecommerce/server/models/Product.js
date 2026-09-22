// Product model — talks to the local JSON database (see config/store.js).
// Every function here does one simple thing, so it's easy to follow.

const { createCollectionAPI } = require("../config/store");

const collection = createCollectionAPI("products");

// Default values used if a product is created without these fields.
const DEFAULTS = {
  tag: "",
  description: "",
  rating: 4.5,
  reviewCount: 0,
  material: "",
  sizes: [],
};

function find(filter = {}) {
  return collection.find(filter); // already sorted newest-first
}

function findById(id) {
  return collection.findById(id);
}

function create(payload) {
  return collection.create({ ...DEFAULTS, ...payload });
}

function insertMany(payloads) {
  const withDefaults = payloads.map((p) => ({ ...DEFAULTS, ...p }));
  return collection.insertMany(withDefaults);
}

function deleteMany(filter = {}) {
  return collection.deleteMany(filter);
}

module.exports = { find, findById, create, insertMany, deleteMany };
