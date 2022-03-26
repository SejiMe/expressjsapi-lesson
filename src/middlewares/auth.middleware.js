const jwt = require("express-jwt");
const config = require("../helpers/config");

module.exports = jwt({ secret: config.secret, algorithms: ["HS256"] });
