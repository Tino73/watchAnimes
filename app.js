//Imports
const express = require("express");
const app = express();
const port = 3000;

//Static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

//Set Views
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { text: "This is EJs", text2: "Text 2" });
});

app.get("/about", (req, res) => {
  res.render("about", { text: "This is EJs", text3: "Text about" });
});

//Listen on port
app.listen(port, () => {
  console.info(`Listening on port number ${port}`);
});
