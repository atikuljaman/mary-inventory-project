const express = require("express");
const {
  createMessage,
  getMessages,
} = require("../Controllers/messageController");

const router = express.Router();

router.post("/chat/start", createMessage);
router.get("/chat/start/:chatId", getMessages);

module.exports = router;
