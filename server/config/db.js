const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const db = await mongoose.connect(
      "mongodb+srv://lefebvremary90272:wow323wow@cluster0.blfivv8.mongodb.net/Inventory?retryWrites=true&w=majority"
    );
    console.log("Database Connected");
    return db;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
