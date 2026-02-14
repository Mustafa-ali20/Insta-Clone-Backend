const express = require("express");
const multer = require("multer");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post(
  "/",
  upload.single("image"),
  postController.createPostController,
);

module.exports = postRouter;
