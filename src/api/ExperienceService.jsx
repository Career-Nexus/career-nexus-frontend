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
      console.log("Deleting experience with ID:", id);
      const response = await api.delete(`user/experience/?experience_id=${id}`);
      console.log("Deleted Experience response:", response.status);
      return true;
    } catch (error) {
      console.error("Delete Experience Error:", error);
      throw new Error(error.response?.data?.message || "Failed to delete experience");
    }
  },

  async deleteEducation(id) {
    try {
      console.log("Deleting education with ID:", id)
      const response = await api.delete(`user/education/?education_id=${id}`);
      // const response = await api.delete(`user/education/`, {
      //   data: { id } // Send id in the request body
      // });
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
      const response = await api.delete(`user/certification/?certification_id=${id}`);
      console.log("Deleted Certification response:", response.status)
      return true
    } catch (error) {
      console.error("Delete Certification Error:", error.response || error.message)
      throw new Error(error.response?.data?.message || "Failed to delete certification")
    }
  },
  async addProject(formData) {
    console.log("Api payload", formData)
    try {
      // Create a new FormData object for the API request
      const projectFormData = new FormData()

      // Add the text fields to the FormData
      projectFormData.append("title", formData.title)
      projectFormData.append("description", formData.description)

      // If there's a file, add it to the FormData
      if (formData.image) {
        projectFormData.append("image", formData.image)
      }

      const response = await api.post("/project/", projectFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Added Project response:", response.data)
      return ({ success: true, data: response.data })
    } catch (error) {
      console.error("Add Project Error:", error.response || error.message)
      throw new Error(error.response?.data?.message || "Failed to add project")
    }
  },
  // async getProjects() {
  //   try {
  //     const response = await api.get("project/")
  //     console.log("Fetched Projects response:", response.data)
  //     return response.data
  //   } catch (error) {
  //     console.error("Get Projects Error:", error.response || error.message)
  //     throw new Error(error.response?.data?.message || "Failed to fetch projects")
  //   }
  // },
  //project catalog
  // async createProject(catalog) {
  //   console.log("Api payload", catalog)
  //   try {
  //     const response = await api.post("/project/", catalog);
  //     console.log("project posted", response.data);
  //     return ({ success: true, data: response.data })
  //   } catch (error) {
  //     console.log("Project created");
  //   }
  // },
  async getProjects(params = {}) {
    try {
      const response = await api.get("/project/", { params });
      console.log("project fetched", response.data);
      return ({ success: true, data: response.data })
    } catch (error) {
      console.log("Could not fetch project");
    }
  },
  async getOthersProjects(productId) {
    try {
      const response = await api.get(`/project/?portfolio_id=${productId}`)
      console.log("Others project fetched", response.data);
      return ({ success: true, data: response.data })
    } catch (error) {
      console.log("Could not fetch others project");
    }
  },
  async deleteProject(productId) {
    try {
      const response = await api.delete(`/project/?portfolio_id=${productId}`)
      console.log("project deleted", response.data);
      return ({ success: true, data: response.data })
    } catch (error) {
      console.log("Could not delete project");
    }
  },
}

