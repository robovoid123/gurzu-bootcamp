const { v4: uuidv4 } = require("uuid");

const {
  readFileAsync,
  writeFileAsync,
} = require("../../../../utils/file.utils");

const FILE_PATH = "user_db.json";

/**
 * @brief gets the user array from file if found else creates a new file
 * @returns array of user in the JSON file
 */
const getOrCreateUserDB = async () => {
  try {
    return await readFileAsync(FILE_PATH);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFileAsync(FILE_PATH, []);
      return [];
    } else {
      throw new Error(error);
    }
  }
};

const add = async (argv) => {
  const db = await getOrCreateUserDB();

  const id = uuidv4();
  const newDB = [...db, { id, ...argv }];

  await writeFileAsync(FILE_PATH, newDB);
  return id;
};

const findOne = async (argv) => {
  const db = await getOrCreateUserDB();

  // filter data for which all argv value match
  const data = db.filter((data) => {
    let flag = true;
    Object.keys(argv).forEach((key) => {
      if (data[key] !== argv[key]) {
        flag = false;
        return;
      }
    });
    return flag;
  });

  return data.length > 0 ? data[0] : null;
};

const update = async (id, argv) => {
  const db = await getOrCreateUserDB();

  // remove all undefined values from argv
  let filteredArgv = {};
  Object.keys(argv).forEach((key) => {
    if (argv[key]) {
      filteredArgv[key] = argv[key];
    }
  });

  // get the index of data to be modified
  const index = db.findIndex((data) => data.id === id);

  // update data
  const updatedUser = { ...db[index], ...filteredArgv };
  db[index] = updatedUser;

  await writeFileAsync(FILE_PATH, db);

  return updatedUser;
};

const remove = async (id) => {
  const db = await getOrCreateUserDB();

  const newDB = db.filter((data) => data.id !== id);

  await writeFileAsync(FILE_PATH, newDB);
};

const getAll = async (argv) => {
  return await getOrCreateUserDB();
};

module.exports = {
  add,
  getAll,
  update,
  remove,
  findOne,
};
