const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
const followModel = require("../models/follow.model");

async function registerController(req, res) {
  const { email, password, username, bio, fullName, profileImage } = req.body;
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message:
        "User already exists" +
        (isUserAlreadyExists.email === email
          ? " with this email"
          : " with this username"),
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    fullName,
    email,
    bio,
    profileImage,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
  });

  res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function loginController(req, res) {
  const { email, password, username } = req.body;

  const user = await userModel
    .findOne({
      $or: [{ username: username }, { email: email }],
    })
    .select("+password");

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
  });

  res.status(201).json({
    message: "User logged in successfully",
    token,
    user: {
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function getMeController(req, res) {
  try {
    const userId = req.user.id;

    // Get user details
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Get user's posts
    const posts = await postModel
      .find({ user: userId })
      .populate("user", "username fullName profileImage")
      .sort({ createdAt: -1 }) // Newest first
      .lean();

    // Add like count and isLiked to each post
    const postsWithLikes = await Promise.all(
      posts.map(async (post) => {
        const isLiked = await likeModel.findOne({
          user: userId,
          post: post._id,
        });

        post.isLiked = !!isLiked;
        post.likeCount = await likeModel.countDocuments({ post: post._id });

        return post;
      }),
    );

    // Get follower and following counts
    const followerCount = await followModel.countDocuments({
      followee: userId,
      status: "accepted",
    });

    const followingCount = await followModel.countDocuments({
      follower: userId,
      status: "accepted",
    });

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        bio: user.bio,
        profileImage: user.profileImage,
        isPrivate: user.isPrivate,
        postCount: posts.length, // ✅ Total posts
        followerCount, // ✅ Total followers
        followingCount, // ✅ Total following
      },
      posts: postsWithLikes, // ✅ User's posts with like info
    });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({
      message: "Error fetching user data",
      error: error.message,
    });
  }
}

async function logoutController(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,      // true in production
    sameSite: "none",  // if using cross-domain
  });

  return res.status(200).json({
    message: "User logged out successfully",
  });
}

module.exports = { loginController, registerController, getMeController, logoutController };
