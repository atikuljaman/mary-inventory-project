const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
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
    last_login: {
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
  { minimize: false },
  { timestamps: true }
);

// Ensure no pre-save hooks alter the password
UserSchema.pre("save", function (next) {
  console.log("Pre-save hook:", this);
  next();
});

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;
