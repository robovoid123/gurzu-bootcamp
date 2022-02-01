const axios = require("axios");

const axiosRead = async (apiUrl) => {
  try {
    return axios.get(apiUrl).then(({ data }) => data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { axiosRead };
