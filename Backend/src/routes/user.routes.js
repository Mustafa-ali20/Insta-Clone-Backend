const express = require("express");
const userRouter = express.Router();
const { followUserController, unfollowuserController } = require("../controllers/user.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");

/**
 * @route POST /api/user/follow/:username
 * @description Follow a user
 * @access Private
 */
userRouter.post("/follow/:username", authenticateToken, followUserController);
userRouter.post("/unfollow/:username", authenticateToken, unfollowuserController);


module.exports = userRouter;
