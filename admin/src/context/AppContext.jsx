import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {



    return (
        <AppContext.Provider value={{children}}>
            {children}
        </AppContext.Provider>
    )
};
export default AppContextProvider;