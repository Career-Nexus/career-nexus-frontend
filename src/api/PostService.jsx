import { data } from "react-router-dom"
import api from "./ApiServiceThree"

export const PostService = {

  createPost: async (formData) => {
    return api.post("post/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  async getPosts(params = {}) {
    try {
      const response = await api.get("post/", { params })
      console.log("Posts fetched:", response.data)
      return response.data
    } catch (error) {
      console.error("Get Posts Error:", error.response || error.message)
      throw new Error(error.response?.data?.message || "Failed to fetch posts")
    }
  },
  async getUserPosts(params = {}) {
    try {
      const response = await api.get("/post/posted/", { params })
      console.log("User posts fetched: ", response.data)
      return response.data
    } catch (error) {
      console.error('Get user posts error:', error.response || error.message)
      throw new Error(error.response?.data?.message || "Failed to fetch posts")
    }
  },
  async getFollowingPosts(params = {}) {
    try {
      const response = await api.get("/post/following/", { params })
      console.log("Following Posts fetched:", response.data)
      return response.data
    } catch (error) {
      console.error("Get Posts Error:", error.response || error.message)
      throw new Error(error.response?.data?.message || "Failed to fetch posts")
    }
  },
  async Follow(follow) {
    try {
      console.log('API payload:', follow);
      const response = await api.post("/follow/", follow);
      if (response.data) {
        console.log("Post followed:", response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      const message = error.response?.data?.error?.[0];
      if (message === "User already followed") {
        console.warn("User is already following this profile.");
        return { success: false, error: "User already followed" };
      }
      if (message === "Cannot follow self") {
        console.warn("You cannot follow yourself.");
        return { success: false, error: "Cannot follow self" };
      }
      throw new Error(message || "Failed to follow user");
    }
  },
  async Unfollow(unfollow) {
    try {
      console.log("api payload", unfollow)
      let response = await api.post('/unfollow/', unfollow);
      if (response.data) {
        console.log('post unfollowed', response.data);
        return { success: true, data: response.data }
      }
    } catch (error) {
      console.log("unable to unfollow user", error)
    }
  },
  async getFollowingLists(params = {}) {
    try {
      const response = await api.get("/followings/", { params })
      console.log("Following Users fetched:", response.data)
      return response.data
    } catch (error) {
      console.error("Get Following Users Error:", error.response || error.message)
      throw new Error(error.response?.data?.message || "Failed to fetch Following Users")
    }
  },
  async getPostById(id) {
    try {
      const response = await api.get(`post/${id}/`)
      console.log("Post fetched:", response.data)
      return response.data
    } catch (error) {
      console.error(`Get Post ${id} Error:`, error.response || error.message)
      throw new Error(error.response?.data?.message || "Failed to fetch post")
    }
  },

  // Like a post
  async likePost(postId) {
    try {
      console.log("Api payload", postId)
      const response = await api.post("/post/like/", postId)
      if (response.data) {
        console.log("Post liked:", response.data)
        return { success: true, data: response.data }
      }
    } catch (error) {
      console.error(`Like Post Error:`, error.response || error.message)
      throw new Error(error.response?.data?.message || "Failed to like post")
    }
  },
  async unlikePost(unlike) {
    try {
      console.log("Api payload", unlike)
      let response = await api.post("/post/unlike/", unlike)
      if (response.data) {
        console.log("post unliked", response.data);
        return { success: true, data: response.data }
      }
    } catch (error) {
      console.log("failed to unlike post", error)
    }
  },

  async comment(comment) {
    try {
      console.log("Api payload", comment);
      const formData = new FormData();
      formData.append("post", comment.post);
      formData.append("body", comment.body);
      if (comment.media) {
        formData.append("media", comment.media);
      }

      const response = await api.post("/post/comment/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        console.log("comment added", response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.log("failed to comment post", error);
    }
  },
  async getComment(postId) {
    try {
      console.log("Api payload", postId)
      const response = await api.get(`/post/comment/?post_id=${postId}`)
      if (response.data) {
        console.log("comment retrieved", response.data)
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.log("failed to get user comment", error)
    }
  },
  async reply(reply) {
    try {
      console.log("Api payload", reply)
      const response = await api.post("/post/reply/", reply);
      if (response.data) {
        console.log("replied to post", response.data)
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.log("failed to reply on post", error)
    }
  },
  async likeCommentOrReply(like_comment) {
    try {
      console.log("Api payload", like_comment);
      const response = await api.post("/post/like/comment/", like_comment);
      if (response.data) {
        console.log("Liked")
        return { success: true, data: response.data }
      }
    } catch (error) {
      console.log("failed to like")
    }
  },
  async unlikeCommentOrReply(unlike_comment) {
    try {
      console.log("Api payload", unlike_comment);
      const response = await api.post("/post/unlike/comment/", unlike_comment);
      if (response.data) {
        console.log("Liked")
        return { success: true, data: response.data }
      }
    } catch (error) {
      console.log("failed to like")
    }
  },
  async repost(repost) {
    try {
      console.log("Api payload", repost);
      const response = await api.post("/post/repost/", repost);
      if (response.data) {
        console.log("post reposted", response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.log("failed to repost post")
    }
  },
  async savePost(save) {
    try {
      console.log("Api payload", save);
      const response = await api.post("/post/save/", save);
      if (response.data) {
        console.log("post saved", response.data);
        return ({ success: true, data: response.data })
      }
    } catch (error) {
      console.log("failed to save post", save)
    }
  },
  async getSavedPost() {
    try {
      const response = await api.get("/post/save/");
      if (response.data) {
        console.log("saved posts fetched", response.data);
        return ({ success: true, data: response.data });
      }
    } catch (error) {
      console.log("error getting saved post", error)
    }
  },
  //analysis
  async getAnalytics(){
    try {
      const response = await api.get("/user/analytics/");
      console.log("User analytics fetched:", response.data);
      return response.data;
    } catch (error) {
      console.error("Get User Analytics Error:", error.response || error.message);
      throw new Error(error.response?.data?.message || "Failed to fetch user analytics");
    }
  },
  // profile completion api
  async getProfileCompletion() {
    try {
      const response = await api.get(`/user/completion/`)
      console.log("Profile completion fetched:", response.data)
      return response.data
    } catch (error) {
      console.error(`Get Profile Completion Error:`, error.response || error.message)
      throw new Error(error.response?.data?.message || "Failed to fetch profile completion")
    }
  },
}

