const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const testRoute = require("./routes/testRoute");
app.use(cors());

app.use(bodyParser.json());
app.use("/api",testRoute);

module.exports = app;