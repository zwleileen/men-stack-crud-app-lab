const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  author: String,
  content: String,
});

const Quote = mongoose.model("Quote", quoteSchema); // create model

module.exports = Quote;
