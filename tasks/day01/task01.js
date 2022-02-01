/**
 *
 *  getting news data from api
 *  filtering by author
 *
 * **/

const { stdRead } = require("../../utils/stdRead.utils");
const { getArticles } = require("./getArticles");

const task1 = async () => {
  console.log("# task1: Get news articles filtered by author\n");
  try {
    const { author } = await stdRead({
      properties: {
        author: {
          type: "string",
          description: "enter the author name",
          pattern: /^[a-zA-Z\s]+$/,
          message: "Name must be only letters or spaces",
          required: true,
        },
      },
    });

    const articles = await getArticles();

    const filteredArticle = articles.filter((article) =>
      article.author.toLowerCase().match(author.toLowerCase())
    );

    return filteredArticle.length > 0
      ? filteredArticle
      : `no article of "${author}" found.`;
  } catch (error) {
    console.log(error);
  }
};

const printArticle = (article) => {
  console.log(`
    title: ${article.title}         
    author: ${article.author}
    published at: ${article.publishedAt}
    url: ${article.url}

    description:
    ${article.description}

    content:
    ${article.content}



  `);
};

task1().then((data) => {
  if (Array.isArray(data)) {
    data.forEach((article) => printArticle(article));
  } else {
    console.log(data);
  }
});
