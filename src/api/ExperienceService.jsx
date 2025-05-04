import api from './ApiServiceThree'; // Import the shared Axios instance
import Cookies from 'js-cookie';

export const ExperienceService = {
  async addExperience(experience) {
    try {
      const response = await api.post('user/experience/', experience);
      console.log('Add Experience Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Add Experience Error:', error.response || error.message);
      throw new Error(error.response?.data?.message || 'Failed to add experience');
    }
  },

  async getExperiences() {
    try {
      const response = await api.get('user/experience/');
      console.log('Get Experiences Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Get Experiences Error:', error.response || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch experiences');
    }
  },
};

