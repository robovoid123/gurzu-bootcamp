const User = require("../models/user.model");
const { hashPasswordAsync } = require("../../../../utils/bcrypt.utils");

const add = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const userInDB = await User.findOne({ email });

    if (userInDB) {
      return res.status(400).json({
        msg: "user with that email already exists please use another email address",
      });
    }

    const hashedPassword = await hashPasswordAsync(password);

    const userID = await User.add({
      name,
      email,
      password: hashedPassword,
      address,
    });

    if (!userID) {
      return res.status(500).json({ msg: "failed to add new user" });
    }

    return res.status(201).json({
      msg: "user successfully added!",
      id: userID,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};

const get = async (req, res) => {
  try {
    const id = req.params.id;

    const userInDB = await User.findOne({ id });

    if (!userInDB) {
      return res.status(404).json({ msg: "user not found" });
    }

    return res.json(userInDB);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password, address } = req.body;

    const userInDB = await User.findOne({ id });

    if (!userInDB) {
      return res.status(404).json({ msg: "user not found" });
    }

    if (email && (await User.findOne({ email }))) {
      return res.status(401).json({
        msg: "user with that email already exists please use another email address",
      });
    }

    let newPassword = password;
    if (newPassword) {
      newPassword = await hashPasswordAsync(password);
    }

    const updatedUser = await User.update(id, {
      name,
      password: newPassword,
      email,
      address,
    });

    return res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const userInDB = await User.findOne({ id });

    if (!userInDB) {
      return res.status(404).json({ msg: "user not found" });
    }

    await User.remove(id);

    return res.json({ msg: "user deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};

const getAll = async (_, res) => {
  const db = await User.getAll();
  return res.json(db);
};

module.exports = { add, get, update, remove, getAll };
