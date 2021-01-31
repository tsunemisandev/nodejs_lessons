var express = require("express");

var app = express();

app.set("view engine", "ejs");

const layout = require("express-ejs-layouts");

app.use(layout);

app.get("/", (req, res) => {
  res.render("./home.ejs");
});

app.get("/login", (req, res) => {
  res.render("./login.ejs");
});

app.get("/register", (req, res) => {
  res.render("./register.ejs");
});

app.listen(3000);

console.log("server started");
