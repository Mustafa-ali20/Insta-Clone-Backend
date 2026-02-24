import { createContext, useState, useEffect } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [feed, setFeed] = useState(null);

  return (
    <PostContext.Provider
      value={{ post, setPost, feed, setFeed, loading, setLoading }}
    >
      {children}
    </PostContext.Provider>
  );
};
