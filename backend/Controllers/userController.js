const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const createToken = (_id) => {
  const jwtKey = process.env.JWT_TOKEN;

  return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, user_type, image } =
      req.body;

    let user = await userModel.findOne({ email });

    if (user) return res.status(400).json("User already exists");

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !user_type ||
      !image
    )
      return res.status(400).json("Please enter all fields");

    if (!validator.isEmail(email)) return res.status(400).json("Invalid email");

    user = new userModel({
      firstName,
      lastName,
      username,
      email,
      password,
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
    if (!email || !password)
      return res.status(400).json("Please enter all fields");

    let user = await userModel.findOne({ email });

    if (!user) return res.status(400).json("User does not exist");

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) return res.status(400).json("Wrong credentials");

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
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await userModel.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { registerUser, loginUser, findUser, getUsers };
