const Task = require("../models/task.model");

const add = async (req, res) => {
  const { body } = req;
  try {
    const taskID = await Task.add({ ...body });

    return res.status(201).json({
      msg: "task successfully added!",
      id: taskID[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};

const get = async (req, res) => {
  try {
    const id = req.params.id;

    const taskInDB = await Task.getAll({ id });

    if (taskInDB.length <= 0) {
      return res.status(404).json({ msg: "task not found" });
    }

    return res.json(taskInDB[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { body } = req;

    const taskInDB = await Task.getAll({ id });

    if (taskInDB.length <= 0) {
      return res.status(404).json({ msg: "task not found" });
    }

    const _ = await Task.update(id, { ...body });

    return res.json({ msg: "task successfully updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;

    if ((await Task.getAll({ id })).length <= 0) {
      return res.status(404).json({ msg: "task not found" });
    }

    await Task.remove(id);

    return res.json({ msg: "task deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};

const getAll = async (_, res) => {
  try {
    return res.json(await Task.getAll());
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};

module.exports = { add, get, update, remove, getAll };
