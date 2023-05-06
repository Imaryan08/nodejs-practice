const express = require("express");
const bookController = require("./controllers/book.controller");
const librariesController = require("./controllers/libraries.controller");
const authorController = require("./controllers/author.controller");

const app = express();

app.use(logger);
app.use("/books", bookController);
app.use("/libraries", checkPermission("librarian"), librariesController);
app.use("/author", checkPermission("author"), authorController);

function logger(req, res, next) {
  console.log(req.path);
  next();
}

function checkPermission(user) {
  return function (req, res, next) {
    console.log(user);
    if (user === "librarian" || user === "author") req.permission = true;
    next();
  };
}

module.exports = app;
