const express = require("express");
require("dotenv").config();
const { CategoryModel } = require("../Models/Category.Model");

const CategoryRouter = express.Router();

// a. Category Listing: Create an API endpoint that retrieves a list of categories.
CategoryRouter.get("/", async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).send({ message: "All Categories", categories });
  } catch (e) {
    res.status(401).send({
      message: "Error in getting all categories",
      error: e,
    });
  }
});

// For adding Categories
CategoryRouter.post("/add", async (req, res) => {
  try {
    const category = await new CategoryModel(req.body);
    await category.save()
    res.status(200).send({ message: "Category Succesfully added" });
  } catch (e) {
    res.status(401).send({
      message: "Error in adding category",
      error: e,
    });
  }
});

module.exports = { CategoryRouter };
