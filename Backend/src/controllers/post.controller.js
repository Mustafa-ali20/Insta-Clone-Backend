const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/like.model");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// Create post
async function createPostController(req, res) {
  try {
    const { caption } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Image is required" });
    }

    if (!caption || caption.trim() === "") {
      return res.status(400).json({ message: "Caption is required" });
    }

    // Upload to ImageKit
    const uploadedFile = await imagekit.files.upload({
      file: await toFile(Buffer.from(file.buffer), "file"),
      fileName: `post_${Date.now()}`,
      folder: "/cohort",
    });

    // Create post
    const post = await postModel.create({
      caption: caption.trim(),
      imgUrl: uploadedFile.url,
      user: req.user.id, // From auth middleware
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
}

// Get all user posts
async function getPostController(req, res) {
  try {
    const posts = await postModel
      .find({ user: req.user.id })
      .populate("user", "username fullName profileImage")
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
}

// Get single post details
async function getPostDetailsController(req, res) {
  try {
    // req.post comes from authorizePostOwner middleware
    res.status(200).json({
      message: "Post fetched successfully",
      post: req.post,
    });
  } catch (error) {
    console.error("Get post details error:", error);
    res.status(500).json({
      message: "Failed to fetch post",
      error: error.message,
    });
  }
}

// Delete post
async function deletePostController(req, res) {
  try {
    const postId = req.params.postId;

    await postModel.findByIdAndDelete(postId);

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({
      message: "Failed to delete post",
      error: error.message,
    });
  }
}

// Update post
async function updatePostController(req, res) {
  try {
    const postId = req.params.postId;
    const { caption } = req.body;

    if (!caption || caption.trim() === "") {
      return res.status(400).json({ message: "Caption is required" });
    }

    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      { caption: caption.trim() },
      { new: true }, // Return updated document
    );

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Update post error:", error);
    res.status(500).json({
      message: "Failed to update post",
      error: error.message,
    });
  }
}

async function toggleLikeController(req, res) {
  try {
    const userId = req.user.id; // Better to use ID instead of username
    const postId = req.params.postId;

    // Check if post exists
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Check if already liked
    const existingLike = await likeModel.findOne({
      post: postId,
      user: userId, // Use user ID for consistency
    });

    if (existingLike) {
      // Unlike
      await likeModel.findByIdAndDelete(existingLike._id);

      // Get updated like count
      const likeCount = await likeModel.countDocuments({ post: postId });

      return res.status(200).json({
        message: "Post unliked successfully",
        liked: false,
        likeCount, // ✅ Send back total likes
      });
    } else {
      // Like
      await likeModel.create({
        post: postId,
        user: userId,
      });

      // Get updated like count
      const likeCount = await likeModel.countDocuments({ post: postId });

      return res.status(200).json({
        message: "Post liked successfully",
        liked: true,
        likeCount, // ✅ Send back total likes
      });
    }
  } catch (error) {
    console.error("Toggle like error:", error);
    res.status(500).json({
      message: "Error toggling like",
      error: error.message,
    });
  }
}

async function getFeedController(req, res) {
  const posts = await postModel.find().populate("user");

  res.status(200).json({
    message: "Post fetched successfully",
    posts,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  deletePostController,
  updatePostController,
  toggleLikeController,
  getFeedController,
};
