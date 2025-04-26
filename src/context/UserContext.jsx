import React, { createContext, useState, useEffect, useMemo } from "react";
import api, { authService } from "../api/ApiServiceThree";


// Define the shape of the user data
const defaultUser = {
  id: null,
  name: "",
  profile_photo: "",
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

// Create the Context
export const UserContext = createContext({
  user: defaultUser,
  loading: false,
  error: null,
  fetchUser: () => {},
  updateUser: () => {},
  logout: () => {},
});

// User Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data on mount
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

    // Update user data
    const updateUser = async (updatedData, file) => {
        try{
            setLoading(true);
            let response;
            if(file){
                const formData = new FormData();
                formData.append("profile_photo", file);
                //Append other fields if provided
                Object.keys(updatedData).forEach((key) => {
                    formData.append(key, updatedData[key]);
                })
                response = await api.put("/user/profile-update/",
                    formData,{
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
            }else{
                //haldle regular fields 
                response = await api.put("/user/profile-update/", updatedData);
            }
            // Check if the response is successful
            if (response.status === 200) {
                setUser((prevUser) => ({ ...prevUser, ...response.data })); // Update user state with new data
                setError(null);
            } else {
                setError("Failed to update user data");
            }
            //setUser(response.data); // Update user state with new data
            setUser((prevUser) => ({ ...prevUser, ...response.data })); // Update user state with new data
            setError(null);
            console.log("User data updated successfully:", response.data);
            return response.data;
        }catch (err) {
            const errorMessage = err.response ? err.response.data.message : "Failed to update user data";
            setError(errorMessage);
            //console.error("Error updating user data:", errorMessage);
            throw new Error(errorMessage);
        }finally{
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
    setUser(defaultUser); // Reset user state
    window.location.href = "/login"; // Redirect to login
  };

  // Memoize the context value to prevent unnecessary re-renders
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