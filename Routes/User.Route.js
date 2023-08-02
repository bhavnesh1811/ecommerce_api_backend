const express = require("express");
require("dotenv").config();
const { userAuthentication } = require("../Middlewares/User.authentication.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../Models/User.model.js");

const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await UserModel.find({ email });
  if (user.length === 0) {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(401).send({ message: "Something Went Wrong" });
      } else {
        try {
          const newUser = new UserModel({
            name,
            email,
            password: hash,
          });
          await newUser.save();
          res.status(200).send({ message: "User Registration Suceessful" });
        } catch (e) {
          res.status(401).send({ message: "Something Went Wrong" });
        }
      }
    });
  } else {
    res.status(201).send({ message: "User already exist, Please login" });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.find({ email });

  if (user.length > 0) {
    bcrypt.compare(password, user[0].password, async (err, result) => {
      if (result) {
        try {
          const token = jwt.sign(
            { userID: user[0]._id },
            process.env.userSecretKey
          );
          res.status(200).send({ message: "Login Successful", token: token });
        } catch (e) {
          res
            .status(401)
            .send({ message: "Something Went Wrong", err: e.message });
        }
      } else {
        res
          .status(201)
          .send({ message: "Wrong Credentials", error: "Wrong Password" });
      }
    });
  } else {
    res
      .status(201)
      .send({ message: "User is not registered,Please register first" });
  }
});

UserRouter.get("/user", userAuthentication, async (req, res) => {
  const { userID } = req.body;
  // console.log(userID);
  try {
    const user = await UserModel.findOne({ _id: userID });
    res.status(200).send({ message: "User Details", user: user });
  } catch (e) {
    res.status(201).send({
      message: "User is not authenticated,Please login first",
      error: e,
    });
  }
});
UserRouter.post("/logout", async (req, res) => {
//   const { userID } = req.body;
  // console.log(userID);
  try {
    // await UserModel.findOne({ _id: userID });
    res.status(200).send({ message: "User Logout Success" });
  } catch (e) {
    res.status(201).send({
      message: "User is not logged in,Please login first",
      error: e,
    });
  }
});

module.exports = { UserRouter };
