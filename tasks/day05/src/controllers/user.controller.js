const User = require("../models/user.model");
const { hashPasswordAsync } = require("../../../../utils/bcrypt.utils");

const add = async (req, res) => {
  const { body } = req;
  try {
    if ((await User.getAll({ email: body.email })).length > 0) {
      return res.status(409).json({
        msg: "user with that email already exists please use another email address",
      });
    }

    const userID = await User.add({
      ...body,
      password: await hashPasswordAsync(body.password),
    });

    return res.status(201).json({
      msg: "user successfully added!",
      id: userID[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};

const get = async (req, res) => {
  try {
    const id = req.params.id;

    const userInDB = await User.getAll({ id });

    if (userInDB.length <= 0) {
      return res.status(404).json({ msg: "user not found" });
    }

    return res.json(userInDB[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { body } = req;

    const userInDB = await User.getAll({ id });

    if (userInDB.length <= 0) {
      return res.status(404).json({ msg: "user not found" });
    }

    if (body.email && (await User.getAll({ email })).length > 0) {
      return res.status(409).json({
        msg: "user with that email already exists please use another email address",
      });
    }

    let newPassword = body.password;
    if (newPassword) {
      newPassword = await hashPasswordAsync(body.password);
    }

    const _ = await User.update(id, {
      ...body,
      password: newPassword,
    });

    return res.json({ msg: "user successfully updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;

    if ((await User.getAll({ id })).length <= 0) {
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
  try {
    return res.json(await User.getAll());
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};

module.exports = { add, get, update, remove, getAll };
