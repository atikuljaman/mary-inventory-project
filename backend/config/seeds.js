const connectDb = require("./db");
// const Item = require("../");
// const User = require("../models/User");
const bcrypt = require("bcrypt");
const Item = require("../Models/itemModel");
const User = require("../Models/userModel");

(async () => {
  const db = await connectDb();

  // Delete all existing users and properties
  await User.deleteMany({});
  await Item.deleteMany({});

  // Hash the admin user's password
  const hashedPassword = await bcrypt.hash("mary1234567890", 10); // 10 is the salt

  // Create a new user
  const user = await User.create({
    firstName: "mary",
    lastName: "lefebvre",
    email: "wilshire@gmail.com",
    password: hashedPassword,
    username: "mary",
    user_type: "admin",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
  });
  //const user2 = await User.create({
  // firstName: "test",
  //lastName: "test",
  // email: "test@example.com",
  //password: "password123",
  //username: "test",
  // user_type: "client",
  //image:
  // "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  //});

  // Create some items
  const itemNames = [
    "3x10 Sterilization Pouches",
    "Plastic Cups",
    "Xray Barrier Size 0",
    "Xray Barrier Size 2",
    "Bitewing Tabs",
    "Clear Barrier Roll",
    "Sharps Containers",
    "Prophy Paste",
    "Saliva Ejectors",
    "HVE",
    "2x2 Gauze",
    "Tray Covers",
    "Hand Sanitizer (dispenser)",
    "Soap (dispenser)",
    "Bibs",
    "Alginate",
    "Headrest Covers",
    "Composite A1",
    "Composite A2",
    "Composite A3",
    "Composite A3.5",
    "Composite B1",
    "Flowable A1",
    "Flowable B1",
    "GC Cement",
    "G-Bond",
    "Distilled Water (gallon)",
    "Citrisil Tablets(blue)",
    "Citrisil Tablets(white)",
    "Citrisil Tablets(shock)",
    "Mixing Tips (purple)",
    "Mixing Tips (yellow)",
    "Evacuation Traps (2200)",
    "Evacuation Traps (5500)",
    "Evacuation Traps (5501)",
    "Chlorhexidine 0.12% (473ml)",
    "Hydrogen Peroxide",
    "Alcohol (gallon)",
    "Intraoral Tips (yellow)",
    "Topical Anesthetic (Benzocaine)",
    "Rubber Dam",
    "Dental Floss",
    "Sporox (gallon)",

    "Blue Etch (Phosphoric 34%) (48)",

    "Temporary Cement (ZONE) (12)",

    "Articulating Paper(12)",

    "Wooden Wedges (4)",

    "Soflex discs (black) (5)",

    "Soflex discs (blue) (5)",

    "Microbrush (16)",

    "Prophy Angles (case) (3)",

    "ParaPost (yellow) (3)",
    "ParaPost (brown) (3)",
    "ParaPost (red) (3)",

    "Bupivacaine (box) (3)",
    "Articaine (box) (6)",
    "Mepivacaine (box) (3)",
    "Lidocaine (green) (box) (2)",

    "Edge-Ease (12)",

    "Endo Ice (5)",
    "Cavit (7)",
    "Endoring E-foam (2)Blue Etch (Phosphoric 34%) (48)",

    "Temporary Cement (ZONE) (12)",

    "Articulating Paper(12)",

    "Wooden Wedges (4)",

    "Soflex discs (black) (5)",

    "Soflex discs (blue) (5)",

    "Microbrush (16)",

    "Prophy Angles (case) (3)",

    "ParaPost (yellow) (3)",
    "ParaPost (brown) (3)",
    "ParaPost (red) (3)",

    "Bupivacaine (box) (3)",
    "Articaine (box) (6)",
    "Mepivacaine (box) (3)",
    "Lidocaine (green) (box) (2)",

    "Edge-Ease (12)",

    "Endo Ice (5)",
    "Cavit (7)",
    "Endoring E-foam (2)",
    "RC Prep (4)",
    "Eucalyptol (3)",

    "Red Dot Electrode (3)",

    "Structur 2 (A1) (8)",
    "Structur 2 (A2) (8)",

    "Surgical Aspirator (green) (10)",
    "RC Prep (4)",
    "Eucalyptol (3)",

    "Red Dot Electrode (3)",

    "Structur 2 (A1) (8)",
    "Structur 2 (A2) (8)",

    "Surgical Aspirator (green) (10)",
  ];

  const items = await Item.insertMany([
    {
      name: "Multifold Towels",
      cases: 3,
      items_left: 300,
      totalItems: 300,
      boxes: 30,
    },

    {
      name: "Disinfectant wipes",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Soap (gallon)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "CaviCide (gallon)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "CoeCide",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Needles 27Ga (short)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Needles 27Ga (long)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Needles 30Ga (short)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Lidocaine Red (box)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Cotton Tip Applicators",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Light Body VPS (Regular Set)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Heavy Body VPS (Regular Set)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Heavy Body VPS (Fast Set)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Masks",

      totalItems: 150,

      items_left: 150,
    },
    {
      name: "Nitrile Gloves (Small)",
      boxes: 30,
      items_left: 300,
      totalItems: 300,
      cases: 3,
    },
    {
      name: "Nitrile Gloves (Medium)",
      boxes: 30,
      cases: 3,
      items_left: 300,
      totalItems: 300,
    },
    {
      name: "Nitrile Gloves (Large)",
      boxes: 30,
      cases: 3,
      items_left: 300,
      totalItems: 300,
    },
    {
      name: "Nitrile Gloves (X Small)",
      boxes: 30,
      items_left: 300,
      totalItems: 300,

      cases: 3,
    },
    {
      name: "3x10 Sterilization Pouches",
      boxes: 30,
      cases: 3,
      items_left: 300,
      totalItems: 300,
    },
    {
      name: "Plastic Cups",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Xray Barrier Size 0",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Xray Barrier Size 2",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Bitewing Tabs",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Clear Barrier Roll",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Sharps Containers",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Prophy Paste",

      totalItems: 150,

      items_left: 150,
    },
    {
      name: "Saliva Ejectors",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "HVE",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "2x2 Gauze",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Tray Covers",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Hand Sanitizer (dispenser)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Soap (dispenser)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Bibs",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Alginate",

      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Headrest Covers",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Composite A1",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Composite A2",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Composite A3",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Composite A3.5",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Composite B1",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Flowable A1",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Flowable B1",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "GC Cement",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "G-Bond",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Distilled Water (gallon)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Citrisil Tablets(blue)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Citrisil Tablets(white)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Citrisil Tablets(shock)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Mixing Tips (purple)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Mixing Tips (yellow)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Evacuation Traps (2200)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Evacuation Traps (5500)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Evacuation Traps (5501)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Chlorhexidine 0.12% (473ml)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Hydrogen Peroxide",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Alcohol (gallon)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Intraoral Tips (yellow)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Topical Anesthetic (Benzocaine)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Rubber Dam",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Dental Floss",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Sporox (gallon)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Blue Etch (Phosphoric 34%)",
      totalItems: 48,
      items_left: 48,
    },
    {
      name: "Temporary Cement (ZONE)",
      totalItems: 12,
      items_left: 12,
    },
    {
      name: "Articulating Paper",
      totalItems: 12,
      items_left: 12,
    },
    {
      name: "Wooden Wedges",
      totalItems: 4,
      items_left: 4,
    },
    {
      name: "Soflex discs (black)",
      totalItems: 5,
      items_left: 5,
    },
    {
      name: "Soflex discs (blue)",
      totalItems: 5,
      items_left: 5,
    },
    {
      name: "Microbrush",
      totalItems: 16,
      items_left: 16,
    },
    {
      name: "Prophy Angles (case)",
      totalItems: 3,
      items_left: 3,
    },
    {
      name: "ParaPost (yellow)",
      totalItems: 3,
      items_left: 3,
    },
    {
      name: "ParaPost (brown)",
      totalItems: 3,
      items_left: 3,
    },
    {
      name: "ParaPost (red)",
      totalItems: 3,
      items_left: 3,
    },
    {
      name: "Bupivacaine",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Articaine",

      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Mepivacaine",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Lidocaine (green)",
      totalItems: 150,
      items_left: 150,
    },
    {
      name: "Edge-Ease",
      totalItems: 12,
      items_left: 12,
    },
    {
      name: "Endo Ice",
      totalItems: 5,
      items_left: 5,
    },
    {
      name: "Cavit",
      totalItems: 7,
      items_left: 7,
    },
    {
      name: "Endoring E-foam",
      totalItems: 2,
      items_left: 2,
    },
    {
      name: "RC Prep",
      totalItems: 4,
      items_left: 4,
    },
    {
      name: "Eucalyptol",
      totalItems: 3,
      items_left: 3,
    },
    {
      name: "Red Dot Electrode",
      totalItems: 3,
      items_left: 3,
    },
    {
      name: "Structur 2 (A1)",
      totalItems: 8,
      items_left: 8,
    },
    {
      name: "Structur 2 (A2)",
      totalItems: 8,
      items_left: 8,
    },
    {
      name: "Surgical Aspirator (green)",
      totalItems: 10,
      items_left: 10,
    },
  ]);

  console.log(`User ${user.email} created with items:`);
  console.log(items);

  // Close the database connection
  process.exit(1);
})();
