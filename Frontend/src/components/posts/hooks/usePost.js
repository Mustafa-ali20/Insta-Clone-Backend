import {
  createPost,
  getFeed,
  toggleLikeUnlikePost,
} from "../services/post.api";
import { useContext, useEffect } from "react";
import { PostContext } from "../posts.context";

export const usePost = () => {
  const context = useContext(PostContext);
  const { post, setPost, feed, setFeed, loading, setLoading } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts.reverse());
    setLoading(false);
  };

  const handleCreatePost = async (imageFile, caption) => {
    setLoading(true);
    const data = await createPost(imageFile, caption);
    setFeed([data.post, ...feed]);
    setLoading(false);
  };

  const handleLikeUnlikePost = async (postId) => {
    const data = await toggleLikeUnlikePost(postId);

    // Just update that one post in feed, no refetch, no loading
    setFeed((prevFeed) =>
      prevFeed.map((post) =>
        post._id === postId
          ? { ...post, isLiked: data.liked, likeCount: data.likeCount }
          : post,
      ),
    );
  };

  useEffect(() => {
    handleGetFeed();
  }, []);

  return {
    post,
    feed,
    loading,
    handleGetFeed,
    handleCreatePost,
    handleLikeUnlikePost,
  };
};
