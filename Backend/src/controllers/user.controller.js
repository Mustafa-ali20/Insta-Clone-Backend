const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

// 1️⃣ Follow User Controller
async function followUserController(req, res) {
  try {
    const followerId = req.user.id; // ✅ Changed from username
    const followerUsername = req.user.username; // Keep for messages
    const followeeUsername = req.params.username;

    // Check if trying to follow yourself
    if (followeeUsername === req.user.username) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    // Find the followee user
    const followee = await userModel.findOne({ username: followeeUsername });
    if (!followee) {
      return res.status(404).json({
        message: `User ${followeeUsername} not found`,
      });
    }

    // Check if already following or request pending
    const existingFollow = await followModel.findOne({
      follower: followerId, // ✅ Using ID now
      followee: followee._id, // ✅ Using ID now
    });

    if (existingFollow) {
      if (existingFollow.status === "accepted") {
        return res.status(400).json({
          message: `You are already following ${followeeUsername}`,
        });
      }
      if (existingFollow.status === "pending") {
        return res.status(400).json({
          message: `Follow request already sent to ${followeeUsername}`,
        });
      }
      if (existingFollow.status === "rejected") {
        // Allow retry after rejection
        existingFollow.status = "pending";
        await existingFollow.save();
        return res.status(200).json({
          message: `Follow request resent to ${followeeUsername}`,
          follow: existingFollow,
        });
      }
    }

    // Create follow request
    // If account is PUBLIC → auto-accept
    // If account is PRIVATE → pending
    const status = followee.isPrivate ? "pending" : "accepted";

    const followRecord = await followModel.create({
      follower: followerId, // ✅ Using ID
      followee: followee._id, // ✅ Using ID
      status,
    });

    const message = followee.isPrivate
      ? `Follow request sent to ${followeeUsername}`
      : `You are now following ${followeeUsername}`;

    res.status(201).json({
      message,
      follow: {
        follower: followerUsername,
        followee: followeeUsername,
        status,
        _id: followRecord._id,
      },
    });
  } catch (error) {
    console.error("Follow error:", error);
    res.status(500).json({
      message: "Error following user",
      error: error.message,
    });
  }
}

// 2️⃣ Unfollow User Controller
async function unfollowUserController(req, res) {
  try {
    const followerId = req.user.id; // ✅ Changed
    const followeeUsername = req.params.username;

    const followee = await userModel.findOne({ username: followeeUsername });
    if (!followee) {
      return res.status(404).json({
        message: `User ${followeeUsername} not found`,
      });
    }

    const followRecord = await followModel.findOne({
      follower: followerId, // ✅ Using ID
      followee: followee._id, // ✅ Using ID
    });

    if (!followRecord) {
      return res.status(400).json({
        message: `You are not following ${followeeUsername}`,
      });
    }

    await followModel.findByIdAndDelete(followRecord._id);

    const message =
      followRecord.status === "pending"
        ? `Follow request cancelled for ${followeeUsername}`
        : `You unfollowed ${followeeUsername}`;

    res.status(200).json({ message });
  } catch (error) {
    console.error("Unfollow error:", error);
    res.status(500).json({
      message: "Error unfollowing user",
      error: error.message,
    });
  }
}

// 3️⃣ Accept Follow Request Controller
async function acceptFollowRequestController(req, res) {
  try {
    const followeeId = req.user.id; // ✅ Changed (the person accepting)
    const followerUsername = req.params.username; // Who sent the request

    const follower = await userModel.findOne({ username: followerUsername });
    if (!follower) {
      return res.status(404).json({
        message: `User ${followerUsername} not found`,
      });
    }

    const followRequest = await followModel.findOne({
      follower: follower._id, // ✅ Using ID
      followee: followeeId, // ✅ Using ID
      status: "pending",
    });

    if (!followRequest) {
      return res.status(404).json({
        message: "No pending follow request from this user",
      });
    }

    followRequest.status = "accepted";
    await followRequest.save();

    res.status(200).json({
      message: `You accepted ${followerUsername}'s follow request`,
      follow: followRequest,
    });
  } catch (error) {
    console.error("Accept request error:", error);
    res.status(500).json({
      message: "Error accepting follow request",
      error: error.message,
    });
  }
}

// 4️⃣ Reject Follow Request Controller
async function rejectFollowRequestController(req, res) {
  try {
    const followeeId = req.user.id; // ✅ Changed
    const followerUsername = req.params.username;

    const follower = await userModel.findOne({ username: followerUsername });
    if (!follower) {
      return res.status(404).json({
        message: `User ${followerUsername} not found`,
      });
    }

    const followRequest = await followModel.findOne({
      follower: follower._id, // ✅ Using ID
      followee: followeeId, // ✅ Using ID
      status: "pending",
    });

    if (!followRequest) {
      return res.status(404).json({
        message: "No pending follow request from this user",
      });
    }

    // Delete the request (like Instagram)
    await followModel.findByIdAndDelete(followRequest._id);

    res.status(200).json({
      message: `You rejected ${followerUsername}'s follow request`,
    });
  } catch (error) {
    console.error("Reject request error:", error);
    res.status(500).json({
      message: "Error rejecting follow request",
      error: error.message,
    });
  }
}

// 5️⃣ Get Pending Follow Requests Controller (THIS FIXES YOUR ISSUE!)
async function getPendingFollowRequestsController(req, res) {
  try {
    const userId = req.user.id; 

    const pendingRequests = await followModel
      .find({
        followee: userId, 
        status: "pending",
      })
      .populate("follower", "username fullName profileImage") 
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Pending follow requests fetched successfully",
      requests: pendingRequests.map((req) => ({
        username: req.follower.username, 
        profileImage: req.follower.profileImage, 
        fullName: req.follower.fullName,
        requestedAt: req.createdAt,
        requestId: req._id,
      })),
      count: pendingRequests.length,
    });
  } catch (error) {
    console.error("Get requests error:", error);
    res.status(500).json({
      message: "Error fetching follow requests",
      error: error.message,
    });
  }
}

async function togglePrivacyController(req, res) {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle the privacy setting
    user.isPrivate = !user.isPrivate;
    await user.save();

    res.status(200).json({
      message: user.isPrivate
        ? "Account is now private"
        : "Account is now public",
      isPrivate: user.isPrivate,
    });
  } catch (error) {
    console.error("Toggle privacy error:", error);
    res.status(500).json({
      message: "Error updating privacy settings",
      error: error.message,
    });
  }
}

module.exports = {
  followUserController,
  unfollowUserController,
  acceptFollowRequestController,
  rejectFollowRequestController,
  getPendingFollowRequestsController,
  togglePrivacyController,
};
