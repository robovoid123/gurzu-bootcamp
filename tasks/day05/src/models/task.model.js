const knex = require("../knex");

const add = async (argv) => knex("tasks").insert({ ...argv });

const getAll = async (argv) => {
  return knex("tasks")
    .select()
    .where({ ...argv });
};

const update = async (id, argv) => {
  return knex("tasks")
    .update({ ...argv })
    .where({ id });
};

const remove = async (id) => knex("tasks").where({ id }).del();

module.exports = {
  add,
  getAll,
  update,
  remove,
};
