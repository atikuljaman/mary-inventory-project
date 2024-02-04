const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const chatMessageSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, required: true },
  senderName: { type: String },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

chatMessageSchema.pre("save", async function (next) {
  const id = this.senderId.toString();
  const { firstName, lastName, user_type } = await User.findById({ _id: id });

  this.senderName = `${firstName} ${lastName} ${
    user_type === "admin" ? "(admin)" : ""
  }`;
  next();
});

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
module.exports = ChatMessage;
