const bcrypt = require("bcrypt");

const hashPasswordSync = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const hashPasswordAsync = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = { hashPasswordSync, hashPasswordAsync };
