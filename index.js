//Imports
const express = require("express");
const bodyParser = require("body-parser");
var Anime = require("anime-scraper").Anime;
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
//Static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

//Set Views
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { text: "<h6>This is EJs</h6>", text2: "Text 2" });
});

app.get("/about", (req, res) => {
  res.render("about", { text: "This is EJs", text3: "Text about" });
});

// app.post("/login", (req, res) => {
//   const { name, password } = req.body;

//   if (name === "admin" && password === "admin") {
//     res.render("success", {
//       username: name,
//     });
//   } else {
//     res.render("failure");
//   }
// });

app.post("/animeSearch", (req, res) => {
  const { animeTitle, episodeNumber } = req.body;
  Anime.fromName(animeTitle).then(function (anime) {
    anime.episodes[episodeNumber - 1].fetch().then(function (episode) {
      const url = episode.videoLinks[1].url;
      console.log(episode);
      const name = anime.name;
      const summary = anime.summary;
      const genres = anime.genres;
      const released = anime.released;
      res.render("success", {
        name: name,
        episode: episodeNumber,
        summary: summary,
        genres: genres,
        released: released,
        url: url,
      });
    });
  });
});

// app.post("/animeSearch", (req, res) => {
//   const { animeTitle, episodeNumber } = req.body;
//   Anime.search(animeTitle).then(function (anime) {
//     anime.episodes[0].fetch().then(function (episode) {
// res.render("success", {
//   animeTitle: animeTitle,
//   episodeNumber: episodeNumber,
// });
//   });
// });
// Anime.fromName(title).then(function (anime) {
//   res.render("success", {
//     titles: anime,
//   });
// });
// });

//Listen on port
app.listen(port, () => {
  console.log(`Listening on port number ${port}`);
});
