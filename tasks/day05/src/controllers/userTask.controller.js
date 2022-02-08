const Task = require("../models/task.model");
const UserTask = require("../models/userTask.model");
const User = require("../models/user.model");

const assignToUser = async (req, res) => {
  try {
    const { body } = req;

    const taskInDB = await Task.getAll({ id: body.task_id });
    const userInDB = await User.getAll({ id: body.user_id });

    if (taskInDB.length <= 0) {
      return res.status(404).json({ msg: "task not found" });
    }

    if (userInDB.length <= 0) {
      return res.status(404).json({ msg: "user not found" });
    }

    await UserTask.add({ ...body });

    return res.json({ msg: "assigned task to user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};

const unassignToUser = async (req, res) => {
  try {
    const { body } = req;

    const taskInDB = await Task.getAll({ id: body.task_id });
    const userInDB = await User.getAll({ id: body.user_id });

    if (taskInDB.length <= 0) {
      return res.status(404).json({ msg: "task not found" });
    }

    if (userInDB.length <= 0) {
      return res.status(404).json({ msg: "user not found" });
    }

    const userTaskInDB = await UserTask.getAll({ ...body });

    if (userTaskInDB.length <= 0) {
      return res.status(404).json({ msg: "task not assigned to user" });
    }

    await UserTask.remove(userTaskInDB[0].id);

    return res.json({ msg: "unassigned task to user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};

const getAllByUser = async (req, res) => {
  try {
    const user_id = req.params.id;

    const userInDB = await User.getAll({ id: user_id });

    if (userInDB.length <= 0) {
      return res.status(404).json({ msg: "user not found" });
    }

    const userTaskInDB = await UserTask.getAll({ user_id });

    return res.json(userTaskInDB);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};

module.exports = { assignToUser, unassignToUser, getAllByUser };
