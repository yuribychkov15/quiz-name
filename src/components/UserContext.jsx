// Holds context for user's name
import React, { createContext, useState } from "react";

// UserContext
export const UserContext = createContext();

// UserProvider component
// This will let the user add their name to the quiz before they get started so it can appear on the results page once they finish. 
export function UserProvider({children}) {
    const [name, setName] = useState("");
    
    return <UserContext.Provider value={{ name, setName }}>{children}</UserContext.Provider>
}