//imports go here
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const Quote = require("./models/Quote.js");

//configs go here
const app = express();
const port = 3000;

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//middleware goes here
app.use(morgan("dev"));
//For ejs only:
app.use(express.urlencoded({ extended: false }));

//routes go here
app.get("/", async (req, res) => {
  res.send("hello hello");
});

//listen goes here
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
