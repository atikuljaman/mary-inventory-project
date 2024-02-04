const express = require("express");
const Item = require("../models/Item");
const User = require("../models/User");
const router = express.Router();
const exceljs = require("exceljs");
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const jsonData = require("../utils/driveAuth");

router.post("/", async (req, res) => {
  const { name, user_id } = req.body;
  try {
    const data = new Item({
      name,
      user_id,
    });
    const response = await data.save();
    res.status(201).json({ status: "Sucess", data: response });
  } catch (error) {
    // console.log(error)

    res.status(400).json({ status: "failed", message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await Item.find();
    res.status(201).json({ status: "Sucess", data: response });
  } catch (error) {
    res.status(400).json({ status: "failed", message: error });
  }
});

router.post("/sold", async (req, res) => {
  const { name, user_id, type } = req.body;

  try {
    const { firstName, lastName } = await User.findOneAndUpdate(
      { _id: user_id },
      { $push: { scannedItems: name, lastScan: Date.now() } }
    );
    if (type == "case") {
      const item = await Item.findOneAndUpdate(
        { name },
        { $inc: { cases: -1, boxes: -10 }, firstName, lastName }
      );
      return res.status(201).json({ status: "Successful", data: item });
    } else if (type == "box") {
      const item = await Item.findOneAndUpdate(
        { name },
        { $inc: { boxes: -1 }, firstName, lastName }
      );
      return res.status(201).json({ status: "Successful", data: item });
    }
    const item = await Item.findOneAndUpdate(
      { name },
      { $inc: { items_left: -1 }, firstName, lastName }
    );
    return res.status(201).json({ status: "Successful", data: item });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "Failed", data: error });
  }
});

router.post("/edit", async (req, res) => {
  const { name, id, totalItems, cases, boxes } = req.body;
  console.log(cases, boxes);
  try {
    if (cases || boxes) {
      const response = await Item.findByIdAndUpdate(
        id,
        { cases, boxes },
        { new: true }
      );
      return res.status(201).json({ status: "Successful", data: response });
    } else {
      const response = await Item.findByIdAndUpdate(
        id,
        { totalItems, items_left: totalItems },
        { new: true }
      );
      return res.status(201).json({ status: "Successful", data: response });
    }
  } catch (error) {
    return res.status(400).json({ status: "Failed", data: error });
  }
});
router.get("/clear", async (req, res) => {
  try {
    const data = await User.find();

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    worksheet.columns = [
      { header: "Username", key: "username" },
      { header: "First Name", key: "firstName" },
      { header: "Last Name", key: "lastName" },
      { header: "Email", key: "email" },
      { header: "User Type", key: "user_type" },
      { header: "Last Login", key: "last_login" },
      { header: "Scanned Items", key: "scannedItems" },
      { header: "Last Scan", key: "lastScan" },
    ];

    data.forEach((user) => {
      worksheet.addRow({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        user_type: user.user_type,
        last_login: user.last_login,
        scannedItems:
          `(${user.scannedItems.length})` + user.scannedItems.join(", "),
        lastScan: user.lastScan.join(", "),
      });
    });

    const excelFilePath = path.join(__dirname, "../../excel/users.xlsx");

    // Write the workbook to the file
    await workbook.xlsx.writeFile(excelFilePath);

    const auth = new google.auth.GoogleAuth({
      credentials: jsonData,
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });
    const drive = google.drive({ version: "v3", auth });
    const fileMetadata = {
      name: "users.xlsx",
      parents: [process.env.GOOGLE_DRIVE_FOLDER],
    };
    const media = {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      body: fs.createReadStream(excelFilePath),
    };
    await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    await User.updateMany({}, { scannedItems: [], lastScan: [] });
    res.status(201).send("Excel file generated successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating Excel file.");
  }
});
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id });
    res.status(200).json({ status: "Success", data: item });
  } catch (error) {
    res.status(400).json({ status: "Failed", data: error });
  }
});

module.exports = router;
