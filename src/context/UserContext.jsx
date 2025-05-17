import React, { createContext, useState, useEffect, useMemo } from "react";
import api, { authService } from "../api/ApiServiceThree";

const defaultUser = {
  id: null,
  first_name: "",
  last_name:"",
  midle_name:"",
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
};
export const UserContext = createContext({
  user: defaultUser,
  loading: false,
  error: null,
  fetchUser: () => {},
  updateUser: () => {},
  logout: () => {},
});
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
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

  const updateUser = async (updatedData, formData) => {
    try {
      setLoading(true);
      let response;
      if (formData instanceof FormData) {
        // Append non-file fields to FormData
        Object.keys(updatedData).forEach((key) => {
          formData.append(key, updatedData[key]);
        });
        response = await api.put("/user/profile-update/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await api.put("/user/profile-update/", updatedData);
      }
      console.log("Update response:", { status: response.status, data: response.data });

      if ([200, 201, 204].includes(response.status)) {
        // Fetch updated user data to ensure consistency
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

  // Fetch user data when the component mounts
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
    }),
    [user, loading, error]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
