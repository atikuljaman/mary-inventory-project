const bcrypt = require("bcryptjs");
const password = "123456";

const testBcrypt = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("Raw password:", password);
    console.log("Hashed password:", hashedPassword);

    const isValidPassword = await bcrypt.compare(password, hashedPassword);
    console.log("Password comparison result:", isValidPassword);
  } catch (error) {
    console.error(error);
  }
};

testBcrypt();
