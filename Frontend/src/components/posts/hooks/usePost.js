import { getFeed } from "../services/post.api";
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

  useEffect(() => {
    handleGetFeed();
  }, []);

  return { post, feed, loading, handleGetFeed };
};