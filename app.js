const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

app.use(morgan("dev")); //logging middleware
app.use(express.static(path.join(__dirname, "./public"))); //serving up static files (e.g. css files)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/wiki", require("./routes/wiki"));
app.use("/users", require("./routes/users"));

const notFound = require("./views/notFound");
const errorPage = require("./views/error");


app.get('/', function (req, res) {
   res.redirect('/wiki/');
});

app.use((req, res, next) => {
    res.status(404).send(notFound());
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(errorPage("cannot execute", err));
})

module.exports = app;
