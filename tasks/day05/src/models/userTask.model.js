const knex = require("../knex");

const add = async (argv) => knex("user_task").insert({ ...argv });

const update = async (id, argv) => {
  return knex("user_task")
    .update({ ...argv })
    .where({ id });
};

const remove = async (id) => knex("user_task").where({ id }).del();

const getAll = async (argv) =>
  await knex("tasks")
    .select("tasks.id", "title", "detail")
    .where({ ...argv })
    .leftJoin("user_task", "tasks.id", "user_task.task_id");

module.exports = {
  add,
  getAll,
  update,
  remove,
};
