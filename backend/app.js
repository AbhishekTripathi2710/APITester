const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const testRoute = require("./routes/testRoute");
const wsRoute = require("./routes/wsRoute")
app.use(cors());

app.use(bodyParser.json());
app.use("/api",testRoute);
app.use("/api",wsRoute);

module.exports = app;