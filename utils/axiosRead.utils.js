const axios = require("axios");

/**
 *
 * @param {string} apiUrl url for api endpoint
 * @returns Promise that resolves to get the response object
 */
const axiosRead = async (apiUrl) => {
  try {
    return axios.get(apiUrl).then(({ data }) => data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { axiosRead };
