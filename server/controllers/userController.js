const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const createToken = (_id) => {
  const jwtKey = process.env.JWT_KEY;

  return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  try {
    const { email, firstName, lastName, password, username, user_type, image } =
      req.body;

    let user = await userModel.findOne({ email });

    if (user)
      return res.status(400).json("User with this email already exists");

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !username ||
      !user_type ||
      !image
    )
      return res.status(400).json("Please fill all the fields");

    if (!validator.isEmail(email)) return res.status(400).json("Invalid email");

    user = new userModel({
      email,
      firstName,
      lastName,
      password,
      username,
      user_type,
      image,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      firstName,
      lastName,
      email,
      image,
      user_type,
      username,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json("User with this email does not exist");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) return res.status(400).json("Invalid password");

    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email,
      image: user.image,
      user_type: user.user_type,
      username: user.username,
      token,
    });
  } catch (error) {}
};

module.exports = { registerUser, loginUser };
