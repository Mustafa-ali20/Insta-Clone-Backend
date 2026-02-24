import React, { useEffect, useState } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { usePost } from "../hooks/usePost";

const Feed = () => {
  const stories = [
    {
      id: 0,
      username: "Your Story",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
      isYourStory: true,
    },
    {
      id: 1,
      username: "unblurred...",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      hasNewStory: true,
    },
    {
      id: 2,
      username: "trandom",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop",
      hasNewStory: true,
    },
    {
      id: 3,
      username: "sheryians...",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      hasNewStory: true,
    },
    {
      id: 4,
      username: "fahhhh",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
      hasNewStory: true,
    },
    {
      id: 5,
      username: "random",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
      hasNewStory: true,
    },
    {
      id: 6,
      username: "random2",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
      hasNewStory: true,
    },
  ];

  const posts = [
    {
      id: 1,
      username: "thehughjackman",
      userAvatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      isVerified: true,
      timestamp: "1d",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=900&fit=crop",
      likes: "478.1K",
      comments: "3.8K",
      shares: "21.4K",
      caption:
        "When you wake up, look in the mirror, and realize you've actually become the character you've played for 25 years.",
    },
    {
      id: 2,
      username: "natgeo",
      userAvatar:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop",
      isVerified: true,
      timestamp: "3h",
      image:
        "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=900&fit=crop",
      likes: "1.2M",
      comments: "12.5K",
      shares: "88.2K",
      caption:
        "The golden hour paints the sky in hues of magic. Photo by @photographer",
    },
    {
      id: 3,
      username: "nasa",
      userAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      isVerified: true,
      timestamp: "5h",
      image:
        "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&h=900&fit=crop",
      likes: "892K",
      comments: "8.1K",
      shares: "54.7K",
      caption: "A breathtaking view from the International Space Station. 🌍✨",
    },
  ];

  const { feed, loading } = usePost();
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});

 
  if (loading || !feed) {
    return <main>Loading ...</main>;
  }

  console.log(feed);

  return (
    <div className="min-h-screen bg-[#0B1014] pb-20 lg:pb-0">
      {/* Stories Section */}
      <div className="border-b border-zinc-800 py-4">
        <div className="w-full max-w-xl mx-auto px-2 sm:px-4">
          <div
            className="flex gap-3 overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {stories.map((story) => (
              <div
                key={story.id}
                className="flex flex-col items-center gap-1 shrink-0 cursor-pointer"
              >
                <div
                  className={`p-0.5 rounded-full ${
                    story.isYourStory
                      ? "bg-zinc-700"
                      : "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
                  }`}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-[#0B1014] p-0.5 relative">
                    <img
                      src={story.avatar}
                      alt={story.username}
                      className="w-full h-full object-cover rounded-full"
                    />
                    {story.isYourStory && (
                      <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-[#0B1014] flex items-center justify-center">
                        <span className="text-white text-xs font-bold leading-none">
                          +
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-xs text-white w-14 sm:w-16 truncate text-center">
                  {story.username}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="w-full max-w-xl mx-auto">
        {posts.map((post) => (
          <article key={post.id} className="mb-4 border-b border-zinc-800 pb-4">
            {/* Post Header */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-3">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                  <img
                    src={post.userAvatar}
                    alt={post.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-1 min-w-0">
                  <span className="text-white font-semibold text-sm truncate">
                    {post.username}
                  </span>
                  {post.isVerified && (
                    <svg
                      className="w-3.5 h-3.5 text-blue-500 shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  )}
                  <span className="text-zinc-500 text-sm shrink-0">
                    • {post.timestamp}
                  </span>
                </div>
              </div>
              <button className="text-white hover:text-zinc-400 shrink-0 ml-2">
                <MoreHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Post Image — vertical 4:5 rectangle */}
            <div
              className="w-full overflow-hidden bg-zinc-900 rounded-lg"
              style={{ aspectRatio: "4/5" }}
            >
              <img
                src={post.image}
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Actions */}
            <div className="px-3 sm:px-4 pt-3">
              {/* Action Buttons Row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4 sm:gap-5">
                  {/* Like */}
                  <button
                    className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                    onClick={() =>
                      setLiked((l) => ({ ...l, [post.id]: !l[post.id] }))
                    }
                  >
                    <Heart
                      className="w-6 h-6 sm:w-7 sm:h-7 transition-colors"
                      style={{
                        color: liked[post.id] ? "#ef4444" : "white",
                        fill: liked[post.id] ? "#ef4444" : "none",
                      }}
                    />
                    {post.likes && (
                      <span className="text-white text-xs sm:text-sm font-medium">
                        {post.likes}
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

                {/* Bookmark */}
                <button
                  className="hover:opacity-70 transition-opacity"
                  onClick={() =>
                    setSaved((s) => ({ ...s, [post.id]: !s[post.id] }))
                  }
                >
                  <Bookmark
                    className="w-6 h-6 sm:w-7 sm:h-7 transition-colors"
                    style={{
                      color: "white",
                      fill: saved[post.id] ? "white" : "none",
                    }}
                  />
                </button>
              </div>

              {/* Caption */}
              <div className="text-sm leading-relaxed">
                <span className="text-white font-semibold mr-1.5">
                  {post.username}
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
        ))}
      </div>
    </div>
  );
};

export default Feed;
