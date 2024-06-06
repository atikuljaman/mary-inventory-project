const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI =
  "mongodb+srv://lefebvremary90272:wow323wow@cluster0.blfivv8.mongodb.net/Inventory?retryWrites=true&w=majority";
// const MONGODB_URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
    return db;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
