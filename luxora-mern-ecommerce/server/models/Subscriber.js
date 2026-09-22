const { createCollectionAPI } = require("../config/store");

const collection = createCollectionAPI("subscribers");

module.exports = {
  findOne: (filter = {}) => collection.findOne(filter),
  create: (payload) => collection.create(payload),
};
