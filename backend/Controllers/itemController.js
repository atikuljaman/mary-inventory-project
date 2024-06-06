const Item = require("../Models/itemModel");
const User = require("../Models/userModel");
const exceljs = require("exceljs");
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const jsonData = require("../utils/driveAuth");

// Controller to create a new item
exports.createItem = async (req, res) => {
  const { name, user_id } = req.body;
  try {
    const data = new Item({ name, user_id });
    const response = await data.save();
    res.status(201).json({ status: "Success", data: response });
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error });
  }
};

// Controller to get all items
exports.getAllItems = async (req, res) => {
  try {
    const response = await Item.find();
    res.status(200).json({ status: "Success", data: response });
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error });
  }
};

// Controller to handle the selling of items
exports.sellItem = async (req, res) => {
  const { name, user_id, type } = req.body;
  try {
    const { firstName, lastName } = await User.findOneAndUpdate(
      { _id: user_id },
      { $push: { scannedItems: name, lastScan: Date.now() } }
    );

    let update = { firstName, lastName };

    // Update logic based on the type of sale (case, box, or item)
    if (type == "case") {
      update = { $inc: { cases: -1, items_left: -100, boxes: -10 }, ...update };
    } else if (type == "box") {
      update = { $inc: { boxes: -1, items_left: -10 }, ...update };
    } else {
      update = { $inc: { items_left: -1 }, ...update };
    }

    const item = await Item.findOneAndUpdate({ name }, update);
    res.status(201).json({ status: "Successful", data: item });
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error });
  }
};

// Controller to edit an item's details
exports.editItem = async (req, res) => {
  const { name, id, totalItems, cases, boxes } = req.body;
  try {
    let update = {};
    if (cases !== undefined || boxes !== undefined) {
      update = { cases, boxes };
    } else {
      update = { totalItems, items_left: totalItems };
    }
    const response = await Item.findByIdAndUpdate(id, update, { new: true });
    res.status(201).json({ status: "Successful", data: response });
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error });
  }
};

// Controller to clear user data and generate an Excel file
exports.clearItems = async (req, res) => {
  try {
    const data = await User.find();

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    // Define columns for the Excel sheet
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

    // Add user data to the worksheet
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

    // Upload the file to Google Drive
    await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    // Clear user scanned items and last scan data
    await User.updateMany({}, { scannedItems: [], lastScan: [] });
    res.status(201).send("Excel file generated successfully.");
  } catch (error) {
    res.status(500).send("Error generating Excel file.");
  }
};

// Controller to get a single item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(200).json({ status: "Success", data: item });
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error });
  }
};
