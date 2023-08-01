const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  availability: { type: Boolean, default: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
