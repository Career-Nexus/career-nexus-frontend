import { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileCompletion, setProfileCompletion] = useState(0);

  return (
    <ProfileContext.Provider value={{ profileCompletion, setProfileCompletion }}>
      {children}
    </ProfileContext.Provider>
  );
};