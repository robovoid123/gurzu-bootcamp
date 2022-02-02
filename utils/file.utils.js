const fs = require("fs");

const writeFileSync = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data), { encoding: "utf-8" });
};

const readFileSync = (path) => {
  return JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));
};

const writeFileAsync = async (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data), (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

const readFileAsync = async (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });

module.exports = { writeFileSync, readFileSync, writeFileAsync, readFileAsync };
