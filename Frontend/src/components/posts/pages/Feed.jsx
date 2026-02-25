import React from "react";
import { usePost } from "../hooks/usePost";
import Post from "../UI/Post";
import Sidebar from "../../layout/Sidebar";
import MobileNav from "../../layout/MobileNav";

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
  ];

  const { feed, loading, handleLike, handleUnLike } = usePost();

  if (loading || !feed) {
    return <main>Loading ...</main>;
  }

  return (
    <div className="min-h-screen bg-[#0B1014] pb-20 lg:pb-0">
      <div>
        <Sidebar />
      </div>

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
                      : "bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600"
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
        {feed.map((post, id) => (
          <Post
            key={id}
            user={post.user}
            post={post}
            loading={loading}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
        ))}
      </div>

      <MobileNav />
    </div>
  );
};

export default Feed;
