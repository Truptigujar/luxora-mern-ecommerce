const { createCollectionAPI } = require("../config/store");

const collection = createCollectionAPI("contactMessages");

module.exports = {
  create: (payload) => collection.create(payload),
  find: (filter = {}) => collection.find(filter),
};
