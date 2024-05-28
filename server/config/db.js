const mongoose = require("mongoose");

require("dotenv").config();

const uri = process.env.ATLAS_URI;

const connectDb = async () => {
  try {
    const db = await mongoose.connect(
      // "mongodb+srv://lefebvremary90272:wow323wow@cluster0.blfivv8.mongodb.net/Inventory?retryWrites=true&w=majority"
      "mongodb+srv://atikul:atikul@chat-app.e7gfsch.mongodb.net/chatApp?retryWrites=true&w=majority&appName=Chat-app"
    );
    console.log("Database Connected");
    return db;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;

// \\mongodb+srv://atikul:atikul@chat-app.e7gfsch.mongodb.net/?retryWrites=true&w=majority&appName=Chat-app
