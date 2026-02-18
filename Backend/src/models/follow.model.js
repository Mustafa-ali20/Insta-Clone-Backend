const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: String,
    },
    followee: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

followSchema.index({ followe: 1, follow: 1 }, { unique: true }); // this is to make sure user follow another user only once

const followModel = mongoose.model("follows", followSchema);
module.exports = followModel;
