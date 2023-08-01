const express = require("express");
require("dotenv").config();
const { connection } = require("./Configs/db.js");
const { CategoryRouter } = require("./Routes/Category.Route.js");
const { ProductRouter } = require("./Routes/Product.Route.js");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Api is working fine.");
});

app.use("/categories", CategoryRouter);
app.use("/products", ProductRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (e) {
    console.log("Not Connected to Database");
  }
  console.log(`Server is running at port ${process.env.port}`);
});
