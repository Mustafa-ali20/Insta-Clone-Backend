import React from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

const Post = ({ user, post, onLike }) => {
  const [saved, setSaved] = React.useState(false);

  const handleLikeClick = () => {
    onLike(post._id);  // Call parent function to toggle like
  };

  return (
    <article className="mb-4 border-b border-zinc-800 pb-4">
      {/* Post Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
            <img
              src={post.user.profileImage}
              alt={post.user.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-white font-semibold text-sm truncate">
              {post.user.username}
            </span>
            {post.user.isVerified && (
              <svg
                className="w-3.5 h-3.5 text-blue-500 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            )}
            <span className="text-zinc-500 text-sm shrink-0">
              • {post.timestamp || "Just now"}
            </span>
          </div>
        </div>
        <button className="text-white hover:text-zinc-400 shrink-0 ml-2">
          <MoreHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Post Image */}
      <div
        className="w-full overflow-hidden bg-zinc-900 rounded-lg"
        style={{ aspectRatio: "4/5" }}
      >
        <img
          src={post.imgUrl}
          alt="Post"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="px-3 sm:px-4 pt-3">
        {/* Action Buttons Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Like Button */}
            <button
              className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
              onClick={handleLikeClick}
            >
              <Heart
                className="w-6 h-6 sm:w-7 sm:h-7 transition-all"
                style={{
                  color: post.isLiked ? "#ef4444" : "white",  // ✅ Use post.isLiked from backend
                  fill: post.isLiked ? "#ef4444" : "none",    // ✅ Red heart if liked
                }}
              />
              {post.likeCount > 0 && (  // ✅ Show like count from backend
                <span className="text-white text-xs sm:text-sm font-medium">
                  {post.likeCount}
                </span>
              )}
            </button>

            {/* Comment */}
            <button className="flex items-center gap-1.5 hover:opacity-70 transition-opacity">
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              {post.comments && (
                <span className="text-white text-xs sm:text-sm font-medium">
                  {post.comments}
                </span>
              )}
            </button>

            {/* Share */}
            <button className="flex items-center gap-1.5 hover:opacity-70 transition-opacity">
              <Send className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              {post.shares && (
                <span className="text-white text-xs sm:text-sm font-medium">
                  {post.shares}
                </span>
              )}
            </button>
          </div>

          {/* Saved */}
          <button
            className="hover:opacity-70 transition-opacity"
            onClick={() => setSaved((prev) => !prev)}
          >
            <Bookmark
              className="w-6 h-6 sm:w-7 sm:h-7 transition-colors"
              style={{
                color: "white",
                fill: saved ? "white" : "none",
              }}
            />
          </button>
        </div>

        {/* Like count text (Instagram style) */}
        {post.likeCount > 0 && (
          <div className="text-white text-sm font-semibold mb-2">
            {post.likeCount} {post.likeCount === 1 ? "like" : "likes"}
          </div>
        )}

        {/* Caption */}
        <div className="text-sm leading-relaxed">
          <span className="text-white font-semibold mr-1.5">
            {post.user.username}
          </span>
          <span className="text-white">{post.caption}</span>
        </div>

        {/* View Comments */}
        {post.comments && (
          <button className="text-zinc-500 text-sm mt-1.5 hover:text-zinc-400 transition-colors">
            View all {post.comments} comments
          </button>
        )}
      </div>
    </article>
  );
};

export default Post;