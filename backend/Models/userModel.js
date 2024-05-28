const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1024,
    },
    image: {
      type: String,
      required: true,
    },
    user_type: {
      type: String,
      required: true,
    },
    last_Login: {
      type: Date,
      default: Date.now(),
    },
    scannedItems: {
      type: [String],
      default: [],
    },
    lastScan: {
      type: [Date],
      default: [],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
