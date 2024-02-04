const connectDb = require('./db');
const Item = require('../models/Item');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

(async () => {
    const db = await connectDb();

    // Delete all existing users and properties
    await User.deleteMany({});
    await Item.deleteMany({});

    // Create a new user
    const user = await User.create({
        firstName: 'Gregory',
        lastName: 'Kaplan',
        email: 'wilshiredentist@gmail.com',
        password: "greg0713kap",
        username: "Dr.Gregory",
        user_type: "admin",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
    });
    //const user2 = await User.create({
        //firstName: 'Emily',
        //lastName: 'Smith',
       // email: 'emily@example.com',
       // password: "password123",
        //username: "emily",
       // user_type: "client",
       // image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    //});

    // Create some items
    const itemNames = [
        "Multifold Towels (case)",
        "Disinfectant wipes",
        "Soap (gallon)",
        "CaviCide (gallon)",
        "CoeCide",
        "Needles 27Ga (short)",
        "Needles 27Ga (long)",
        "Needles 30Ga (short)",
        "Lidocaine Red (box)",
        "Cotton Tip Applicators",
        "Light Body VPS (Regular Set)",
        "Heavy Body VPS (Regular Set)",
        "Heavy Body VPS (Fast Set)",
        "Masks",
        "Nitrile Gloves (Small)",
        "Nitrile Gloves (Medium)",
        "Nitrile Gloves (Large)",
        "Nitrile Gloves (X Small)",
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

        "Surgical Aspirator (green) (10)"
    ];

    const items = await Item.insertMany(itemNames.map(name => ({ name, totalItems: 50, items_left: 50 })));

    console.log(`User ${user.email} created with items:`);
    console.log(items);

    // Close the database connection
    process.exit(1)
})();


