const knex = require("../knex");

const add = async (argv) => knex("users").insert({ ...argv });

const getAll = async (argv) => {
  return knex("users")
    .select()
    .where({ ...argv });
};

const update = async (id, argv) => {
  return knex("users")
    .update({ ...argv })
    .where({ id });
};

const remove = async (id) => knex("users").where({ id }).del();

module.exports = {
  add,
  getAll,
  update,
  remove,
};
