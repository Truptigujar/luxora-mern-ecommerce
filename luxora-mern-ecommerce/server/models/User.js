// User model — talks to the local JSON database (see config/store.js).
// Every function here does one simple thing, so it's easy to follow.

const bcrypt = require("bcryptjs");
const { createCollectionAPI } = require("../config/store");

const collection = createCollectionAPI("users");

function findUser(filter = {}) {
  return collection.findOne(filter);
}

// Creates a new user. The password is hashed before it's stored,
// so the plain-text password is never saved to disk.
async function createUser({ name, email, password = "luxora_demo" }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return collection.create({ name, email: email.toLowerCase(), password: hashedPassword });
}

// Saves any changes made to a user object (e.g. an updated name).
function saveUser(user) {
  collection.replaceOrInsert(user);
  return user;
}

module.exports = { findUser, createUser, saveUser };
