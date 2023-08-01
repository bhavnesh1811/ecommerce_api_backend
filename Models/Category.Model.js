const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const CategoryModel = mongoose.model("categorie", categorySchema);

module.exports = { CategoryModel };
