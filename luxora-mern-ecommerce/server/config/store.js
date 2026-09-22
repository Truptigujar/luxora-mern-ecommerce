const crypto = require("crypto");
const { getData, save } = require("./db");

function genId() {
  return crypto.randomBytes(12).toString("hex"); // looks like a Mongo ObjectId
}

function clone(x) {
  return x == null ? x : JSON.parse(JSON.stringify(x));
}

function matches(doc, filter) {
  return Object.keys(filter).every((key) => {
    const val = filter[key];
    if (val === undefined || val === null || val === "") return true;
    return String(doc[key]).toLowerCase() === String(val).toLowerCase();
  });
}

// Collections are created on first use — new model files can call
// createCollectionAPI("whatever") without needing to register it anywhere.
function getCollection(collectionName) {
  const data = getData();
  if (!data[collectionName]) data[collectionName] = [];
  return data[collectionName];
}

function createCollectionAPI(collectionName) {
  return {
    // find/findOne/findById always return CLONES, never the stored data
    // directly — so a model can freely change the result (add fields,
    // fill in extra details, etc.) without touching what's saved on disk.
    // Nothing is written to disk until replaceOrInsert() is called.
    find(filter = {}) {
      const items = getCollection(collectionName);
      return items
        .filter((doc) => matches(doc, filter))
        .map(clone)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    findOne(filter = {}) {
      const items = getCollection(collectionName);
      const found = items.find((doc) => matches(doc, filter));
      return found ? clone(found) : null;
    },
    findById(id) {
      const items = getCollection(collectionName);
      const found = items.find((doc) => doc._id === id);
      return found ? clone(found) : null;
    },
    create(payload) {
      const items = getCollection(collectionName);
      const now = new Date().toISOString();
      const doc = { _id: genId(), ...payload, createdAt: now, updatedAt: now };
      items.push(doc);
      save();
      return clone(doc);
    },
    insertMany(payloads) {
      const items = getCollection(collectionName);
      const now = new Date().toISOString();
      const docs = payloads.map((p) => ({ _id: genId(), ...p, createdAt: now, updatedAt: now }));
      items.push(...docs);
      save();
      return docs.map(clone);
    },
    deleteMany(filter = {}) {
      const data = getData();
      const items = getCollection(collectionName);
      const remaining = items.filter((doc) => !matches(doc, filter));
      const deletedCount = items.length - remaining.length;
      data[collectionName] = remaining;
      save();
      return { deletedCount };
    },
    // Saves a document — updates it if it already exists, adds it if it's new.
    replaceOrInsert(doc) {
      const items = getCollection(collectionName);
      const plain = clone(doc);
      const idx = items.findIndex((d) => d._id === plain._id);
      if (idx === -1) items.push(plain);
      else items[idx] = plain;
      save();
    },
  };
}

module.exports = { createCollectionAPI, genId };
