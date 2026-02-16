// const postModel = require("../models/post.model");
// const ImageKit = require("@imagekit/nodejs");
// const { toFile } = require("@imagekit/nodejs");
// const jwt = require("jsonwebtoken");
// const imagekit = new ImageKit({ privateKey: process.env.IMAGEKIT_PRIVATE_KEY });

// //create post api
// async function createPostController(req, res) {
//   console.log(req.body, req.file);

//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized Access" });
//   }

//   let decoded = null;

//   try {
//     decoded = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid or Expired Token" });
//   }

//   console.log(decoded);

//   const file = await imagekit.files.upload({
//     file: await toFile(Buffer.from(req.file.buffer), "file"),
//     fileName: "Test",
//     folder: "/cohort",
//   });

//   const post = await postModel.create({
//     caption: req.body.caption,
//     imgUrl: file.url,
//     user: decoded.id,
//   });

//   res.status(201).json({
//     message: "Post created successfully",
//     post,
//   });
// }

// //get post api

// async function getPostController(req, res) {
//   const token = req.cookies.token;
//   let decoded;

//   try {
//     decoded = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (error) {
//     return res.status(401).json({
//       message: "Token invalid",
//     });
//   }

//   const userId = decoded.id;
//   const posts = await postModel.find({
//     user: userId,
//   });
//   res.status(200).json({
//     message: "Posts fetched successfully",
//     posts,
//   });
// }

// //get post details api

// async function getPostDetailsController(req, res) {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized Access" });
//   }

//   let decoded;
//   try {
//     decoded = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid or Expired Token" });
//   }

//   const userid = decoded.id;
//   const postId = req.params.postId;

//   const post = await postModel.findById(postId);

//   if (!post) {
//     return res.status(404).json({
//       message: "Post not found",
//     });
//   }

//   const isValidUser = post.user.toString() === userid;

//   if (!isValidUser) {
//     return res.status(403).json({
//       message: "Forbidden Content",
//     });
//   }

//   res.status(200).json({
//     message: "Post Fetched Successfully",
//     post,
//   });
// }

// async function deletePostController(req, res) {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized Access" });
//   }

//   let decoded;
//   try {
//     decoded = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid or Expired Token" });
//   }

//   const userid = decoded.id;
//   const postId = req.params.postId;

//   const post = await postModel.findById(postId);

//   if (!post) {
//     return res.status(404).json({
//       message: "Post not found",
//     });
//   }

//   const isValidUser = post.user.toString() === userid;

//   if (!isValidUser) {
//     return res.status(403).json({
//       message: "Forbidden Content",
//     });
//   }

//   await postModel.findByIdAndDelete(postId);

//   res.status(200).json({
//     message: "Post Deleted Successfully",
//   });
// }

// async function updatePostController(req, res) {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized Access" });
//   }

//   let decoded;
//   try {
//     decoded = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid or Expired Token" });
//   }

//   const userid = decoded.id;
//   const postId = req.params.postId;

//   const post = await postModel.findById(postId);

//   if (!post) {
//     return res.status(404).json({
//       message: "Post not found",
//     });
//   }

//   const isValidUser = post.user.toString() === userid;

//   if (!isValidUser) {
//     return res.status(403).json({
//       message: "Forbidden Content",
//     });
//   }

//   const updatepost = await postModel.findByIdAndUpdate(postId, {
//     caption: req.body.caption,
//   });

//   res.status(200).json({
//     message: "Post Updated Successfully",
//     post: updatepost,
//   });
// }

// module.exports = {
//   createPostController,
//   getPostController,
//   getPostDetailsController,
//   deletePostController,
//   updatePostController,
// };


const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({ 
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY 
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
      user: req.userId, // From auth middleware
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ 
      message: "Failed to create post", 
      error: error.message 
    });
  }
}

// Get all user posts
async function getPostController(req, res) {
  try {
    const posts = await postModel
      .find({ user: req.userId })
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({ 
      message: "Failed to fetch posts", 
      error: error.message 
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
      error: error.message 
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
      error: error.message 
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
      { new: true } // Return updated document
    );

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Update post error:", error);
    res.status(500).json({ 
      message: "Failed to update post", 
      error: error.message 
    });
  }
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  deletePostController,
  updatePostController, // You forgot this!
};