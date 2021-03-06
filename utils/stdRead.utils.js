const prompt = require("prompt");

/**
 *
 * @param {Array | {}} inputArray
 * @returns response from the std input
 */
const stdRead = async (inputArray) => {
  try {
    prompt.start();
    return await prompt.get(inputArray);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { stdRead };
