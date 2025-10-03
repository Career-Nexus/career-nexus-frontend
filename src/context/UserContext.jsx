import React, { createContext, useState, useEffect, useMemo } from "react";
import api, { authService } from "../api/ApiServiceThree";

const defaultUser = {
  first_name: "",
  last_name:"",
  middle_name:"",
  country_code:null,
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
  years_of_experience:"",
  availability:null,
  current_job:"",
  areas_of_expertise:[],
  technical_skills:[],
  user_type:"",
  linkedin_url:"",
  followers:"",
  followings:"",
  resume:"",
  mentorship_styles:"",
};
export const UserContext = createContext({
  user: defaultUser,
  loading: false,
  error: null,
  fetchUser: () => {},
  updateUser: () => {},
  getUserById: () => {},
  userwithid: defaultUser,
  logout: () => {},
});
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const [userwithid, setUserwithid]=useState(defaultUser);
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
  const getUserById = async (user_id)=>{
    try {
      const response = await api.get(`/user/retrieve-profile/?user_id=${user_id}`)
      setUserwithid(response.data)
    } catch (error) {
      console.log("failed to fetch user by id details")
    }
  };
  // const updateUser = async (updatedData, formData) => {
  //   try {
  //     setLoading(true);
  //     let response;
  //     if (formData instanceof FormData) {
  //       // Append non-file fields to FormData
  //       Object.keys(updatedData).forEach((key) => {
  //         formData.append(key, updatedData[key]);
  //       });
  //       response = await api.put("/user/profile-update/", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });
  //     } else {
  //       response = await api.put("/user/profile-update/", updatedData);
  //     }
  //     console.log("Update response:", { status: response.status, data: response.data });

  //     if ([200, 201, 204].includes(response.status)) {
  //       // Fetch updated user data to ensure consistency
  //       await fetchUser();
  //       setError(null);
  //       return response.data;
  //     } else {
  //       throw new Error("Unexpected response status: " + response.status);
  //     }
  //   } catch (err) {
  //     const errorMessage = err.response
  //       ? err.response.data.message || JSON.stringify(err.response.data)
  //       : err.message || "Failed to update user data";
  //     setError(errorMessage);
  //     console.error("Error updating user data:", errorMessage, err);
  //     throw new Error(errorMessage);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Fetch user data when the component mounts
 const updateUser = async (updatedData) => {
  try {
    setLoading(true);

    let response;
    // If any file is present, we must send FormData
    const hasFile = Object.values(updatedData).some(
      (val) => val instanceof File
    );

    if (hasFile) {
      const formData = new FormData();
      Object.keys(updatedData).forEach((key) => {
        const value = updatedData[key];
        if (value !== null && value !== "" && value !== undefined) {
          formData.append(key, value);
        }
      });

      response = await api.put("/user/profile-update/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      // Only send non-empty values
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
