// for env variables
const dotenv = require("dotenv").config();

const { axiosRead } = require("../../utils/axiosRead.utils");

/**
 *
 * @returns promise that resolves to array of article
 */
const getArticles = async () => {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=apple&from=2022-01-01&to=2022-01-30&sortBy=popularity&apiKey=${process.env.API_KEY}`;

    const { articles } = await axiosRead(apiUrl);
    return articles;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getArticles };
