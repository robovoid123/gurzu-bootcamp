const prompt = require("prompt");

const stdRead = async (inputArray) => {
  try {
    prompt.start();
    return await prompt.get(inputArray);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { stdRead };
