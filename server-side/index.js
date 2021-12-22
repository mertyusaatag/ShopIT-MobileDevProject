const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
//const dotenv = require("dotenv").config({ path: "./config/.env" });
const helmet = require("helmet")
const config = require("./config/index")
const {UserRoutes} = require("./routes");
const loaders = require("./loaders");
const orderRoute = require("./routes/OrderRouter");


config();
loaders();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use("/Order", orderRoute);

// API endpoints

app.listen(process.env.PORT, function () {
  console.log("Server is running on port: " + process.env.PORT);
  app.use("/users",UserRoutes)
});