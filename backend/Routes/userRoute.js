const express = require("express");
const {
  registerUser,
  loginUser,
  findUser,
  getUsers,
  updateAdminImage,
} = require("../Controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/users", getUsers);
// Add the update route
router.post("/update/image", updateAdminImage);

module.exports = router;
