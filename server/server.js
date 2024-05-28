const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
const connectDatabase = require("./config/db");
const PORT = process.env.PORT || 5001;
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");
const path = require("path");
// const dotenv = require("dotenv").config();
require("dotenv").config();
const userRoute = require("./routes/userRoute");

connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, "../client/build")));

io.on("connection", require("./utils/socket"));

// app.use("/api/users", require("./routes/user"));
app.use("/api/users", userRoute);
app.use("/api/items", require("./routes/items"));
app.use("/api/chats", require("./routes/chat"));

server.listen(PORT, "0.0.0.0", (err, port) => {
  console.log(port);
  console.log(`Server 🌍 Started: http://localhost:${PORT}`);
});
