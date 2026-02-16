// const express = require("express");
// const multer = require("multer");
// const postRouter = express.Router();
// const postController = require("../controllers/post.controller");
// const upload = multer({ storage: multer.memoryStorage() });

// postRouter.post(
//   "/",
//   upload.single("image"),
//   postController.createPostController,
// );

// postRouter.get("/", postController.getPostController);

// postRouter.get("/details/:postId", postController.getPostDetailsController);

// postRouter.delete("/:postId", postController.deletePostController);

// postRouter.put(
//   "/:postId",
//   upload.single("image"),
//   postController.updatePostController,
// );

// module.exports = postRouter;

const express = require("express");
const postRouter = express.Router();
const multer = require("multer");
const { authenticateToken } = require("../middleware/auth.middleware");
const { authorizePostOwner } = require("../middleware/postAuth.middleware");
const {
  createPostController,
  getPostController,
  getPostDetailsController,
  deletePostController,
  updatePostController,
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

module.exports = postRouter;
