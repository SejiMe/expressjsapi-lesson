const express = require("express");

const morgan = require("morgan");

const helmet = require("helmet");

const app = express();

app.use(morgan("tiny"));

app.use(helmet());

app.get("/health", (req, res) => res.send("ok"));

module.exports = app;
