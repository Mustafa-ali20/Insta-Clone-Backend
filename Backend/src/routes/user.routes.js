const express = require("express");
const userRouter = express.Router();
const {
  followUserController,
  unfollowUserController,
  acceptFollowRequestController,
  rejectFollowRequestController,
  getPendingFollowRequestsController,
  togglePrivacyController,
} = require("../controllers/user.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");

userRouter.use(authenticateToken);

/**
 * @route POST /api/user/follow/:username
 * @description Follow a user
 * @access Private
 */
userRouter.post("/follow/:username", followUserController);
userRouter.post("/unfollow/:username", unfollowUserController);
userRouter.post("/:username/accept", acceptFollowRequestController);
userRouter.post("/:username/reject", rejectFollowRequestController);
userRouter.get("/requests/pending", getPendingFollowRequestsController);
userRouter.patch("/privacy/toggle", togglePrivacyController);
module.exports = userRouter;
