import api from "./ApiServiceThree"

export const PostService = {
  async createPost(data) {
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid input data: Expected an object');
    }
    // const { body, article, results, count, profile, media } = data;
    const { body, count, profile, media } = data;
    if (!body || body === undefined) {
      throw new Error('Body is required and cannot be undefined');
    }
    // if (!profile || profile === undefined) {
    //   throw new Error('Profile is required and cannot be undefined');
    // }

    const formData = new FormData();
    formData.append('body', body || ''); 
    // formData.append('article', article || '');
    // formData.append('results', results || '');
    formData.append('count', count || '1');
    formData.append('profile', profile || '');
    // formData.append('eventDate', data.eventDate || '');

    if (media) {
      formData.append('media', media);
    }
    for (const [key, value] of formData.entries()) {
      console.log(`FormData ${key}:`, value);
    }
    const response = await api.post('post/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Post created response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Create Post Error:', error.message, error.response?.data);
    throw new Error(error.response?.data?.message || error.message || 'Failed to create post');
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
  async getPostsByProfile(profileId, params = {}) {
    try {
      const response = await api.get(`post/profile/${profileId}/`, { params })
      console.log("Profile posts fetched:", response.data)
      return response.data
    } catch (error) {
      console.error(`Get Profile Posts Error:`, error.response || error.message)
      throw new Error(error.response?.data?.message || "Failed to fetch profile posts")
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
  async checkLikeStatus(postId) {
    try {
      const response = await api.get(`post/like/check/${postId}/`)
      console.log("Like status checked:", response.data)
      return response.data.is_liked || false
    } catch (error) {
      console.error(`Check Like Status Error:`, error.response || error.message)
      // Don't throw error for this one, just return false
      return false
    }
  },

  // Get likes count for a post
  async getLikesCount(postId) {
    try {
      const response = await api.get(`post/like/count/${postId}/`)
      console.log("Likes count fetched:", response.data)
      return response.data.count || 0
    } catch (error) {
      console.error(`Get Likes Count Error:`, error.response || error.message)
      return 0
    }
  },
}

