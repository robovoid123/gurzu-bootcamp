/**
 *
 *  Splitting the news on a weekly basis
 *  Segregate and store in the form of JSON
 *
 **/

const fs = require("fs");
const moment = require("moment");
const { getArticles } = require("./getArticles");

const getArticleKey = (publishedAt) => {
  // 2022-01-30T14:02:45Z
  const date = new Date(publishedAt);

  // considering sunday as the first day of the week
  // firstDayOfWeek = dayOfMonth - dayOfWeek
  // getting date object for first day  and last day of current week
  const firstDayOfWeek = new Date(date).setDate(date.getDate() - date.getDay());
  const lastDayOfWeek = new Date(date).setDate(
    date.getDate() - date.getDay() + 6
  );

  // date format
  const format = "YYYY-MM-DD";
  // key of current week
  // 2021-12-27_2021-12-02
  return `${moment(firstDayOfWeek).format(format)}_${moment(
    lastDayOfWeek
  ).format(format)}`;
};

const task2 = async () => {
  try {
    const articles = await getArticles();
    const articleByWeek = articles.reduce((acc, { source, ...other }) => {
      // reshape article
      const newArticle = {
        source: source.name,
        ...other,
      };

      // get key for key (which week it belongs to)
      const key = getArticleKey(newArticle.publishedAt);
      // assign new array if no article in the current week yet
      const updatedArray = acc[key] || [];

      // push current article to the array
      updatedArray.push(newArticle);
      // update accumulator
      acc[key] = updatedArray;

      return acc;
    }, {});

    fs.writeFile(
      "article_by_week.json",
      JSON.stringify(articleByWeek),
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );

    return articleByWeek;
  } catch (error) {
    console.log(error);
  }
};

task2().then((a) => {
  console.log(a);
});
