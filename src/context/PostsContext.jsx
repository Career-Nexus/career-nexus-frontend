import React, { createContext, useContext, useState } from "react";
import { PostService } from "../api/PostService";


export const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const setAllPosts = (newPosts) => setPosts(newPosts);

  const toggleLike = async (postId) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.post_id === postId) {
          const willLike = post.can_like;
          if (willLike) {
            PostService.likePost({ post: postId });
          } else {
            PostService.unlikePost({ post: postId });
          }
          return {
            ...post,
            can_like: !willLike,
            like_count: willLike ? post.like_count + 1 : post.like_count - 1,
          };
        }
        return post;
      })
    );
  };

  return (
    <PostsContext.Provider value={{ posts, setAllPosts, toggleLike }}>
      {children}
    </PostsContext.Provider>
  );
};