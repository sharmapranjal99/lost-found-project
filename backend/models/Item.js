const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  type: String,
  location: String,
  date: Date,
  contactInfo: String,
  userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("Item", itemSchema);