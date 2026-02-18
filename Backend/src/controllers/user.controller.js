const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  try {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    if (followeeUsername == followerUsername) {
      return res.status(400).json({
        message: "you cannot follow yourself",
      });
    }

    const followeeExist = await userModel.findOne({
      username: followeeUsername,
    });
    if (!followeeExist) {
      return res
        .status(404)
        .json({ message: `User ${followeeUsername} not found` });
    }

    const isAlreadyFollowing = await followModel.findOne({
      follower: followerUsername,
      followee: followeeUsername,
    });

    if (isAlreadyFollowing) {
      return res.status(200).json({
        message: `you are already following ${followeeUsername}`,
        follow: isAlreadyFollowing,
      });
    }

    const followRecord = await followModel.create({
      follower: followerUsername,
      followee: followeeUsername,
    });
    res.status(201).json({
      message: `You are now following ${followeeUsername}`,
      follow: followRecord,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error following user", error: error.message });
  }
}

async function unfollowuserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      message: `You are not following ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);

  res.status(200).json({
    message: `You unfollowed ${followeeUsername}`,
  });
}

module.exports = {
  followUserController,
  unfollowuserController,
};
