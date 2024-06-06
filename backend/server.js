// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const userRoute = require("./Routes/userRoute");
// const chatRoute = require("./Routes/chatRoute");
// const messageRoute = require("./Routes/messageRoute");

// const PORT = process.env.PORT || 5000;
// const MONGODB_URI = process.env.MONGODB_URI;

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.use("/api/users", userRoute);
// app.use("/api/chats", chatRoute);
// app.use("/api/messages", messageRoute);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// mongoose
//   .connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("MongoDB database connection established successfully");
//   })
//   .catch((error) => {
//     console.log(`Error connecting to MongoDB: ${error.message}`);
//   });

// -------------------------------------------------------------------------------------

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");
const itemRoute = require("./Routes/itemRoute");

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
app.use("/api/items", itemRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Connect to the database and start the server
const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
