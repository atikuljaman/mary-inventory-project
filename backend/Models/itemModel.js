const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  exp_date: {
    type: Date,
  },
  totalItems: {
    type: Number,
  },
  boxes: {
    type: Number,
  },
  cases: {
    type: Number,
  },
  scanned_on: {
    type: Date,
    default: Date.now(),
  },
  firstName: {
    type: String,
    // required: true
  },
  lastName: {
    type: String,
    // required: true
  },
  items_left: {
    type: Number,
  },
  lastLogin: {
    type: Date,
    // required: true
  },
});

const ItemModel = mongoose.model("Item", ItemSchema);

module.exports = ItemModel;
