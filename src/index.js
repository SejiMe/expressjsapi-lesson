const express = require("express");

const morgan = require("morgan");

const helmet = require("helmet");

const app = express();

app.use(morgan("combined"));

app.use(helmet());

app.get("/health", (req, res) => res.send("ok"));

app.use("/api", require("./handlers"));

app.use((req, res, next) => {
  res.status(404).json({ message: "resource not found" });
});

module.exports = app;
