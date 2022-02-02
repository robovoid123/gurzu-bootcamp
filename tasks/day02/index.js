const yargs = require("yargs");
const {
  addUser,
  readUser,
  readAllUser,
  updateUser,
  deleteUser,
} = require("./userAsync");

yargs.command({
  command: "add",
  describe: "add user to a JSON file",
  handler: (argv) => {
    addUser(argv);
  },
  builder: {
    name: {
      describe: "name of the user",
      demandOption: true,
    },
    email: {
      describe: "unique email of the user",
      demandOption: true,
    },
    password: {
      describe: "password of the user",
      demandOption: true,
    },
    address: {
      describe: "address of the user",
    },
  },
});

yargs.command({
  command: "readAll",
  describe: "read all users",
  handler: (argv) => {
    readAllUser();
  },
});

yargs.command({
  command: "read",
  describe: "read user detail ",
  handler: (argv) => {
    readUser(argv);
  },
  builder: {
    email: {
      describe: "unique email of the user",
      demandOption: true,
    },
  },
});

yargs.command({
  command: "update",
  describe: "update user detail ",
  handler: (argv) => {
    updateUser(argv);
  },
  builder: {
    name: {
      describe: "name of the user",
    },
    email: {
      describe: "unique email of the user",
      demandOption: true,
    },
    newEmail: {
      describe: "unique email of the user",
    },
    password: {
      describe: "password of the user",
    },
    address: {
      describe: "address of the user",
    },
  },
});

yargs.command({
  command: "delete",
  describe: "delete user detail ",
  handler: (argv) => {
    deleteUser(argv);
  },
  builder: {
    email: {
      describe: "unique email of the user",
      demandOption: true,
    },
  },
});

yargs.parse();
