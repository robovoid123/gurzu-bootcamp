const { readFileSync, writeFileSync } = require("../../utils/file.utils");
const { hashPasswordSync } = require("../../utils/bcrypt.util");

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
const getOrCreateUserDB = () => {
  try {
    return readFileSync(FILE_PATH);
  } catch (error) {
    if (error.code === "ENOENT") {
      writeFileSync(FILE_PATH, {});
      return {};
    }
    console.error(error);
  }
};

const readAllUser = () => {
  const db = getOrCreateUserDB();
  Object.keys(db).forEach((key) => {
    printUser(db[key]);
  });
};

const addUser = (argv) => {
  const { name, email, password, address } = argv;
  const db = getOrCreateUserDB();

  const userInDB = db[email];

  if (userInDB) {
    console.log(
      "user with that email already exists please use another email address"
    );
    return -1;
  }

  console.log("adding user...");

  const hashedPassword = hashPasswordSync(password);

  db[email] = { name, email, password: hashedPassword, address };
  writeFileSync(FILE_PATH, db);

  console.log("user added!!");
};

const readUser = (argv) => {
  const { email } = argv;
  const db = getOrCreateUserDB();

  const userInDB = db[email];

  if (!userInDB) {
    console.log("no user found");
    return -1;
  }

  const { name, address } = userInDB;
  printUser({ name, email, address });

  return userInDB;
};

const deleteUser = (argv) => {
  const { email } = argv;
  const db = getOrCreateUserDB();

  const userInDB = db[email];

  if (!userInDB) {
    console.log("no user found");
    return -1;
  }

  const { [email]: _, ...other } = db;

  writeFileSync(FILE_PATH, other);

  console.log("user deleted");
};

const updateUser = (argv) => {
  const { name, email, newEmail, password, address } = argv;
  const db = getOrCreateUserDB();

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

  console.log("updating user...");
  updatedData = { name, password, email: newEmail, address };
  for (key of Object.keys(updatedData)) {
    if (updatedData[key]) {
      userInDB[key] = updatedData[key];
    }
  }

  db[email] = userInDB;

  writeFileSync(FILE_PATH, db);
  console.log("user updated!!");
};

module.exports = { addUser, readUser, readAllUser, deleteUser, updateUser };
