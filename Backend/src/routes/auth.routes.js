const express = require("express");
const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {
  registerController,
  loginController,
  getMeController,
  logoutController,
} = require("../controllers/auth.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");

const authRouter = express.Router();

authRouter.post("/register", registerController);

authRouter.post("/login", loginController);

authRouter.get("/get-me", authenticateToken, getMeController);

authRouter.post("/logout", authenticateToken, logoutController);

module.exports = authRouter;
