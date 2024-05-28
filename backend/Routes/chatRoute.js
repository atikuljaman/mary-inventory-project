const express = require("express");
const {
  createChat,
  findUserChats,
  findChat,
} = require("../Controllers/chatController");

const router = express.Router();

router.post("/chat/start", createChat);
router.get("/chat/start/:userId", findUserChats);
router.get("/chat/start/find/:firstId/:secondId", findChat);

module.exports = router;
