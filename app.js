const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const PORT = 9912;
const app = express();
// app.METHOD(PATH,HANDLER)....syntax for using express methods;

// app.use(express.json());
// app.get("/result", (req, res) => {
//   ;
// });
const url = "https://justarsenal.com";
axios(url)
  .then((response) => {
    const html = response.data;
    // console.log(html);
    const $ = cheerio.load(html);
    const articles = [];
    // console.log(spec);
    //cleaner scrapping
    $(".img-txt", html).each((index, element) => {
      const title = $(element).children(".title").text();
      const titleUrl = $(element).children(".title").attr("href");
      articles.push({ title, titleUrl });
    });
    //another way to scrap
    // $(".img-txt", html).each(function () {
    //   const title = $(this).text();
    //   const titleUrl = $(this).find("a").attr("href");
    //   articles.push({ title, titleUrl });
    // });
    console.log(articles);
  })
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
