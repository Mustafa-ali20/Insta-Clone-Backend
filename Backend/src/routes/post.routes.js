const express = require("express");
const postRouter = express.Router();
const multer = require("multer");
const { authenticateToken } = require("../middlewares/auth.middleware");
const { authorizePostOwner } = require("../middlewares/postAuth.middleware");
const {
  createPostController,
  getPostController,
  getPostDetailsController,
  deletePostController,
  updatePostController,
  toggleLikeController,
} = require("../controllers/post.controller");
const upload = multer({ storage: multer.memoryStorage() });

postRouter.use(authenticateToken);

postRouter.post(
  "/",
  authenticateToken,
  upload.single("image"),
  createPostController,
);

postRouter.get("/", getPostController);

postRouter.get(
  "/details/:postId",
  authorizePostOwner,
  getPostDetailsController,
);
postRouter.delete("/:postId", authorizePostOwner, deletePostController);

postRouter.patch(
  "/:postId",
  upload.single("image"),
  authorizePostOwner,
  updatePostController,
);

/**
 * @route POST/ /api/posts/like/:postid
 * @description like a post with the id provided in the request params
 */
postRouter.post("/like/:postId", authenticateToken, toggleLikeController);

module.exports = postRouter;
