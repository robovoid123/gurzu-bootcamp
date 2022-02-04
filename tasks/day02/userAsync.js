const { readFileAsync, writeFileAsync } = require("../../utils/file.utils");
// const { hashPasswordAsync } = require("../../utils/bcrypt.utils");
const { encryptPassword } = require("../../utils/cryptojs.utils");

const FILE_PATH = "user_db.json";

const printUser = ({ name, email, address }) => {
  console.log(`
  Name: ${name}
  Email: ${email}
  ${address ? "Address: " + address : ""}
  `);
};

/**
 * @brief gets the user array from file if found else creates a new file
 * @returns array of user in the JSON file
 */
const getOrCreateUserDB = async () => {
  try {
    return await readFileAsync(FILE_PATH);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFileAsync(FILE_PATH, {});
      return {};
    }
    console.error(error);
  }
};

const readAllUser = async () => {
  try {
    const db = await getOrCreateUserDB();
    Object.keys(db).forEach((key) => {
      printUser(db[key]);
    });
  } catch (error) {
    console.log(error);
  }
};

const addUser = async (argv) => {
  try {
    const { name, email, password, address } = argv;
    const db = await getOrCreateUserDB();

    const userInDB = db[email];

    if (userInDB) {
      console.log(
        "user with that email already exists please use another email address"
      );
      return -1;
    }

    console.log("adding user...");

    // const hashedPassword = await hashPasswordAsync(password);
    const encryptedPassword = encryptPassword(password, password);

    db[email] = { name, email, password: encryptedPassword, address };
    await writeFileAsync(FILE_PATH, db);

    console.log("user added!!");
  } catch (error) {
    console.log(error);
  }
};

const readUser = async (argv) => {
  try {
    const { email } = argv;
    const db = await getOrCreateUserDB();

    const userInDB = db[email];

    if (!userInDB) {
      console.log("no user found");
      return -1;
    }

    const { name, address } = userInDB;
    printUser({ name, email, address });

    return userInDB;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (argv) => {
  try {
    const { email } = argv;
    const db = await getOrCreateUserDB();

    const userInDB = db[email];

    if (!userInDB) {
      console.log("no user found");
      return -1;
    }

    const { [email]: _, ...other } = db;

    await writeFileAsync(FILE_PATH, other);

    console.log("user deleted");
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (argv) => {
  try {
    const { name, email, newEmail, password, address } = argv;
    const db = await getOrCreateUserDB();

    const userInDB = db[email];

    if (!userInDB) {
      console.log("no user found");
      return -1;
    }

    if (userInDB[newEmail]) {
      console.log(
        "user with that email already exists please use another email address"
      );
      return -1;
    }

    let newPassword = password;
    if (newPassword) {
      newPassword = encryptPassword(password, password);
    }

    console.log("updating user...");
    const updatedData = {
      name,
      password: newPassword,
      email: newEmail,
      address,
    };
    for (key of Object.keys(updatedData)) {
      if (updatedData[key]) {
        userInDB[key] = updatedData[key];
      }
    }

    db[email] = userInDB;

    await writeFileAsync(FILE_PATH, db);
    console.log("user updated!!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addUser, readUser, readAllUser, deleteUser, updateUser };
