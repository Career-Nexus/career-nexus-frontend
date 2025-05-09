import api from "./ApiServiceThree" // Import the shared Axios instance

export const ExperienceService = {
  async addExperience(experience) {
    try {
      const response = await api.post("user/experience/", experience)
      console.log("Add Experience Response:", response.data)
      return response.data
    } catch (error) {
      console.error("Add Experience Error:", error.response || error.message)
      throw new Error(error.response?.data?.message || "Failed to add experience")
    }
  },

  async updateExperience(id, experienceData) {
    try {
      const dataWithId = { ...experienceData, id }
      console.log("Updating experience with data:", dataWithId)
      const response = await api.put(`user/update-experience/`, dataWithId)
      console.log("Updated Experience response:", response.data)
      return response.data
    } catch (error) {
      console.error("Update Experience Error:", error.response || error.message)
      throw new Error(error.response?.data?.message || "Failed to update experience")
    }
  },

  async addEducation(education) {
    try {
      const response = await api.post("user/education/", education)
      console.log("Added Education response:", response.data)
      return response.data
    } catch (error) {
      console.error("Add Education Error:", error.response || error.message)
      throw new Error(error.response?.data?.message || "Failed to add education")
    }
  },
  async updateEducation(id, educationData) {
    try {
      // Create payload with id included
      const dataWithId = { ...educationData, id };
      console.log("Updating education with data", dataWithId);
      const response = await api.put(`user/education/`, dataWithId);
      console.log("Updated education response:", response.data)
      return response.data
    } catch (error) {
      console.error("Update education Error:", error.response || error.message)
      throw new Error(error.response?.data?.message || "Failed to update education")
    }
  },
  
  async addCertification(certification) {
    try {
      const response = await api.post("user/certification/", certification)
      console.log("Added Certification response:", response.data)
      return response.data
    } catch (error) {
      console.error("Add certification Error:", error.response || error.message)
      throw new Error(error.response?.data?.message || "Failed to add certification")
    }
  },

  async deleteExperience(id) {
    try {
      console.log("Deleting experience with ID:", id)
      const response = await api.delete(`user/experience/`,{
        data: {id}
      })
      // const response = await api.delete(`user/delete-experience/`,{
      //   data: {id}
      // })
      console.log("Deleted Experience response:", response.status)
      return true
    } catch (error) {
      console.error("Delete Experience Error:", error)
      throw new Error(error.response?.data?.message || "Failed to delete experience")
    }
  },

  async deleteEducation(id) {
    try {
      console.log("Deleting education with ID:", id)
      const response = await api.delete(`user/education/`, {
        data: { id } // Send id in the request body
      });
      console.log("Deleted Education response:", response.status)
      return true
    } catch (error) {
      console.error("Delete Education Error:", error.response || error.message)
      throw new Error(error.response?.data?.message || "Failed to delete education")
    }
  },

  async deleteCertification(id) {
    try {
      console.log("Deleting certification with ID:", id)
      const response = await api.delete(`user/certification/`, {
        data: { id }
      });
      console.log("Deleted Certification response:", response.status)
      return true
    } catch (error) {
      console.error("Delete Certification Error:", error.response || error.message)
      throw new Error(error.response?.data?.message || "Failed to delete certification")
    }
  },
}
