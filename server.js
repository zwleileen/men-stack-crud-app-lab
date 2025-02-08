//imports go here
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const Quote = require("./models/Quote.js");
const methodOverride = require("method-override"); // new

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
app.use(methodOverride("_method")); // new
app.use(express.urlencoded({ extended: false }));

//routes go here
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("/quotes", async (req, res) => {
  const allQuotes = await Quote.find();
  res.render("quotes/index.ejs", { quotes: allQuotes });
});

app.get("/quotes/new", async (req, res) => {
  res.render("quotes/new.ejs");
});

app.post("/quotes", async (req, res) => {
  await Quote.create(req.body);
  res.send("created");
});

app.get("/quotes/:quoteId", async (req, res) => {
  const foundQuote = await Quote.findById(req.params.quoteId);
  res.render("quotes/show.ejs", { quote: foundQuote });
});

app.get("/quotes/:quoteId/edit", async (req, res) => {
  const foundQuote = await Quote.findById(req.params.quoteId);
  res.render("quotes/edit.ejs", { quote: foundQuote });
});

app.put("/quotes/:quoteId", async (req, res) => {
  await Quote.findByIdAndUpdate(req.params.quoteId, req.body);
  res.send("updated");
});

//listen goes here
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
