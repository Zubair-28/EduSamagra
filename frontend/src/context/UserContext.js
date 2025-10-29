import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null); // Store user profile data here

    // You could add functions here to fetch profile if needed,
    // triggered after login or on initial load if token exists.
    // For now, we'll rely on dashboard pages setting it via props if needed,
    // or you can set it after login.

    return (
        <UserContext.Provider value={{ userProfile, setUserProfile }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);