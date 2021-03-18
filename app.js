//Imports
const express = require("express");
const app = express();
const port = 3000;

//Listen on port
app.listen(port, () => {
  console.info(`Listening on port number ${port}`);
});
