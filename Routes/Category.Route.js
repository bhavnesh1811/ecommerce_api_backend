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

module.exports = { CategoryRouter };
