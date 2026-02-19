const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Username already exists"],
      required: [true, "Username is required"],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    bio: String,

    profileImage: {
      type: String,
      default:
        "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png",
    },
    isPrivate: {
      type: Boolean,
      default: false, // ✅ Public by default (like Instagram)
    },
  },
  {
    timestamps: true, // ✅ Good to add this too (adds createdAt, updatedAt)
  },
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
