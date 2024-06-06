const express = require("express");
const {
  createItem,
  getAllItems,
  sellItem,
  editItem,
  clearItems,
  getItemById,
} = require("../Controllers/itemController");

const router = express.Router();

// Define routes and map them to controller functions
router.post("/", createItem);
router.get("/", getAllItems);
router.post("/sold", sellItem);
router.post("/edit", editItem);
router.get("/clear", clearItems);
router.get("/:id", getItemById);

module.exports = router;
