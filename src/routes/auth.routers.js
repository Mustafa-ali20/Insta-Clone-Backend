const express = require("express");
const userModel = require("../models/user.models");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { email, password, username, bio, profileImage } = req.body;
  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    return res.send(409).json({
      message: "User already exists",
    });
  }

  const user = userModel.create({
    username,
    email,
    password,
  });
});
