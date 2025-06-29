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

  // Get posts by user profile
  // async getPostsByProfile(profileId, params = {}) {
  //   try {
  //     const response = await api.get(`post/profile/${profileId}/`, { params })
  //     console.log("Profile posts fetched:", response.data)
  //     return response.data
  //   } catch (error) {
  //     console.error(`Get Profile Posts Error:`, error.response || error.message)
  //     throw new Error(error.response?.data?.message || "Failed to fetch profile posts")
  //   }
  // },

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

  // Unlike a post
  async unlikePost(postId) {
    try {
      const response = await api.delete(`post/like/${postId}/`)
      console.log("Post unliked:", response.data)
      return response.data
    } catch (error) {
      console.error(`Unlike Post Error:`, error.response || error.message)
      throw new Error(error.response?.data?.message || "Failed to unlike post")
    }
  },

  // Toggle like status (like if not liked, unlike if already liked)
  async toggleLike(postId, isLiked) {
    if (isLiked) {
      return this.unlikePost(postId)
    } else {
      return this.likePost(postId)
    }
  },

  // Check if user has liked a post
  // async checkLikeStatus(postId) {
  //   try {
  //     const response = await api.get(`post/like/check/${postId}/`)
  //     console.log("Like status checked:", response.data)
  //     return response.data.is_liked || false
  //   } catch (error) {
  //     console.error(`Check Like Status Error:`, error.response || error.message)
  //     return false
  //   }
  // },

  // Get likes count for a post
  // async getLikesCount(postId) {
  //   try {
  //     const response = await api.get(`post/like/count/${postId}/`)
  //     console.log("Likes count fetched:", response.data)
  //     return response.data.count || 0
  //   } catch (error) {
  //     console.error(`Get Likes Count Error:`, error.response || error.message)
  //     return 0
  //   }
  // },

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

