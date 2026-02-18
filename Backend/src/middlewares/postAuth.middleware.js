// middleware/postAuth.middleware.js
const postModel = require("../models/post.model");
const { rawListeners } = require("../models/user.model");

async function authorizePostOwner(req, res, next) {
  try {
    const postId = req.params.postId;
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden Content" });
    }

    req.post = post; // Attach post to request
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}

module.exports = { authorizePostOwner };

// You call toString() because post.user is an ObjectId object while req.userId is a string; converting the ObjectId to a string makes the comparison valid. A clearer alternative is post.user.equals(req.userId), and always guard against null/ populated cases before calling .toString().

