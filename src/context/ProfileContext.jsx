
import { createContext, useState, useEffect } from "react";
import { PostService } from "../api/PostService";


export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [completionData, setCompletionData] = useState({
    completion: 0,
    complete_items: [],
    incomplete_items: []
  });

  useEffect(() => {
    const fetchProfileCompletion = async () => {
      try {
        const result = await PostService.getProfileCompletion();
        console.log("Profile completion response:", result);
        setProfileCompletion(result.completion);
        setCompletionData(result);
      } catch (error) {
        console.error("Error fetching profile completion:", error);
        setProfileCompletion(0);
        setCompletionData({
          completion: 0,
          complete_items: [],
          incomplete_items: []
        });
      }
    };

    fetchProfileCompletion();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profileCompletion,
        setProfileCompletion,
        completionData,
        setCompletionData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
