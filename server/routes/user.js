const express = require("express");

const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  const { email, firstName, lastName, password, username, user_type, image } =
    req.body;

  try {
    let data = new User({
      email,
      firstName,
      lastName,
      password,
      username,
      user_type,
      image,
    });
    data = await data.save();
    res.status(201).json({ status: "Successfull", data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Failed", message: error });
  }
});

router.post("/update", async (req, res) => {
  try {
    const data = await User.findOneAndUpdate(
      { user_type: "admin" },
      { image: req.body.image }
    );

    res.status(201).json({ status: "successful", message: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(404)
      .json({ status: "Failed", message: "Enter Valid Info" });
  }

  try {
    const emailValid = await User.findOne({ email });
    const passValid = bcrypt.compareSync(password, emailValid.password);
    if (passValid) {
      await User.updateOne({ email }, { last_login: Date.now() });
      return res.status(200).json({ status: "Successful", data: emailValid });
    } else {
      return res
        .status(404)
        .json({ status: "Failed", message: "Enter Valid Info" });
    }
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error });
  }
});

router.get("/allEmployees", async (req, res) => {
  try {
    const data = await User.find({ user_type: { $ne: "admin" } });

    res.status(200).json({ status: "successful", data: data });
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error });
  }
});
router.get("/getAdmin", async (req, res) => {
  try {
    const data = await User.find({ user_type: "admin" });

    res.status(200).json({ status: "successful", data: data });
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await User.findById(id);
    res.status(200).json({ status: "successful", data: data });
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error });
  }
});

module.exports = router;
