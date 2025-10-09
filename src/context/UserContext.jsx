import React, { createContext, useState, useEffect, useMemo } from "react";
import api, { authService } from "../api/ApiServiceThree";

const defaultUser = {
  first_name: "",
  last_name: "",
  middle_name: "",
  country_code: null,
  profile_photo: null,
  cover_photo: null,
  location: "",
  position: "",
  bio: "",
  qualification: "",
  intro_video: "",
  summary: "",
  experience: [],
  education: [],
  certification: [],
  years_of_experience: "",
  availability: null,
  current_job: "",
  areas_of_expertise: [],
  technical_skills: [],
  user_type: "",
  linkedin_url: "",
  followers: "",
  followings: "",
  resume: "",
  industry:"",
  session_rate:"",
  mentorship_styles: "",
};
export const UserContext = createContext({
  user: defaultUser,
  loading: false,
  error: null,
  fetchUser: () => { },
  updateUser: () => { },
  getUserById: () => { },
  userwithid: defaultUser,
  logout: () => { },
});
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const [userwithid, setUserwithid] = useState(defaultUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    if (!authService.isAuthenticated()) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await api.get("/user/retrieve-profile/");
      setUser(response.data);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };
  const getUserById = async (user_id) => {
    try {
      const response = await api.get(`/user/retrieve-profile/?user_id=${user_id}`)
      setUserwithid(response.data)
    } catch (error) {
      console.log("failed to fetch user by id details")
    }
  };
  const updateUser = async (updatedData) => {
    try {
      setLoading(true);

      let response;
      const formData = new FormData();

      let hasFile = false;

      // Append all fields
      Object.keys(updatedData).forEach((key) => {
        const value = updatedData[key];
        if (value !== null && value !== "" && value !== undefined) {
          if (value instanceof File) {
            hasFile = true;
          }
          formData.append(key, value);
        }
      });

      if (hasFile) {
        // send as multipart if any file is present
        response = await api.put("/user/profile-update/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // if no files, send as JSON
        const cleanedData = {};
        Object.keys(updatedData).forEach((key) => {
          const value = updatedData[key];
          if (value !== null && value !== "" && value !== undefined) {
            cleanedData[key] = value;
          }
        });

        response = await api.put("/user/profile-update/", cleanedData);
      }

      console.log("Update response:", response.status, response.data);

      if ([200, 201, 204].includes(response.status)) {
        await fetchUser();
        setError(null);
        return response.data;
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message || JSON.stringify(err.response.data)
        : err.message || "Failed to update user data";

      setError(errorMessage);
      console.error("Error updating user data:", errorMessage, err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Logout function
  const logout = () => {
    authService.logout(); // Clears cookies and session storage
    setUser(defaultUser);
    window.location.href = "/login";
  };

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      error,
      fetchUser,
      updateUser,
      logout,
      getUserById,
      userwithid,
    }),
    [user, userwithid, loading, error]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
