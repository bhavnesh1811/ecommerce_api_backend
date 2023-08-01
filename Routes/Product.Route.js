const express = require("express");
require("dotenv").config();
const { ProductModel } = require("../Models/Product.Model");

const ProductRouter = express.Router();

/* Product Listing: Create an API endpoint that retrieves a list of products with
essential details such as title, price, description, and availability, based on
category Id */

ProductRouter.get("/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const products = await ProductModel.find({ category: categoryId });
    res.status(200).send({ message: "All Products", products });
  } catch (e) {
    res.status(401).send({
      message: "Error in getting all products",
      error: e,
    });
  }
});

ProductRouter.post("/add", async (req, res) => {
  try {
    const product = await new ProductModel(req.body);
    await product.save()
    res.status(200).send({ message: "Product Succesfully added" });
  } catch (e) {
    res.status(401).send({
      message: "Error in adding Product.",
      error: e,
    });
  }
});

ProductRouter.get("/product/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await ProductModel.findById(productId);
    res.status(200).send({ message: "Product Details", product });
  } catch (e) {
    res.status(401).send({
      message: "Error in getting product details",
      error: e,
    });
  }
});

module.exports = { ProductRouter };
