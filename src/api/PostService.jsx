import api from "./ApiServiceThree"

export const PostService = {
  // async createPost(data) {
  //   try {
  //     if (!data || typeof data !== "object") {
  //       throw new Error("Invalid input data: Expected an object")
  //     }

  //     const { body, count, profile, media, pic1, pic2, pic3, video } = data

  //     if (!body || body === undefined) {
  //       throw new Error("Body is required and cannot be undefined")
  //     }

  //     const formData = new FormData()
  //     formData.append("body", body || "")
  //     formData.append("count", count || "1")
  //     formData.append("profile", profile || "")

  //     // Handle multiple media files if provided
  //     if (pic1 && pic1 !== "N/A") {
  //       formData.append("pic1", pic1)
  //     }
  //     if (pic2 && pic2 !== "N/A") {
  //       formData.append("pic2", pic2)
  //     }
  //     if (pic3 && pic3 !== "N/A") {
  //       formData.append("pic3", pic3)
  //     }
  //     if (video && video !== "N/A") {
  //       formData.append("video", video)
  //     }

  //     // Fallback for single media (backward compatibility)
  //     if (media && !pic1 && !pic2 && !pic3 && !video) {
  //       formData.append("media", media)
  //     }

  //     // Debug logging
  //     for (const [key, value] of formData.entries()) {
  //       if (value instanceof File) {
  //         console.log(`FormData ${key}: File - ${value.name} (${value.size} bytes, ${value.type})`)
  //       } else {
  //         console.log(`FormData ${key}:`, value)
  //       }
  //     }

  //     const response = await api.post("post/", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })

  //     console.log("Post created response:", response.data)
  //     return response.data
  //   } catch (error) {
  //     console.error("Create Post Error:", error.message, error.response?.data)
  //     throw new Error(error.response?.data?.message || error.message || "Failed to create post")
  //   }
  // },
  async createPost(data) {
    try {
      if (!data || typeof data !== "object") {
        throw new Error("Invalid input data: Expected an object")
      }

      const { body, count, profile, pic1, pic2, pic3, video, article } = data

      if (!body || body === undefined) {
        throw new Error("Body is required and cannot be undefined")
      }

      const formData = new FormData()
      formData.append("body", body || "")
      formData.append("count", count || "1")
      formData.append("profile", profile || "")
      formData.append("article", article || "N/A")

      // Handle multiple media files
      if (pic1 && pic1 !== "N/A") {
        formData.append("pic1", pic1)
      } else {
        formData.append("pic1", "N/A")
      }

      if (pic2 && pic2 !== "N/A") {
        formData.append("pic2", pic2)
      } else {
        formData.append("pic2", "N/A")
      }

      if (pic3 && pic3 !== "N/A") {
        formData.append("pic3", pic3)
      } else {
        formData.append("pic3", "N/A")
      }

      if (video && video !== "N/A") {
        formData.append("video", video)
      } else {
        formData.append("video", "N/A")
      }

      // Debug logging
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`FormData ${key}: File - ${value.name} (${value.size} bytes, ${value.type})`)
        } else {
          console.log(`FormData ${key}:`, value)
        }
      }

      const response = await api.post("post/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Post created response:", response.data)
      return response.data
    } catch (error) {
      console.error("Create Post Error:", error.message, error.response?.data)
      throw new Error(error.response?.data?.message || error.message || "Failed to create post")
    }
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
      const response = await api.post("/follow/", follow)
      if (response.data)
        console.log("Post followed:", response.data)
      return response.data
    } catch (error) {
      const message = error.response?.data?.error?.[0];
      if (message === "User already followed") {
        console.warn("User is already following this profile.");
        return null; // or trigger a UI update
      }
      if (message === "Cannot follow self") {
        console.warn("You cannot follow yourself.");
        return null; // or trigger a UI update
      }
      throw new Error(message || "Failed to follow user");
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
      const response = await api.post("post/like/", { post: postId })
      console.log("Post liked:", response.data)
      return response.data
    } catch (error) {
      console.error(`Like Post Error:`, error.response || error.message)
      throw new Error(error.response?.data?.message || "Failed to like post")
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

