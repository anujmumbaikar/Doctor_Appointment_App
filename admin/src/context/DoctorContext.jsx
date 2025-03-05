import { createContext } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {



    return (
        <DoctorContext.Provider value={{children}}>
            {children}
        </DoctorContext.Provider>
    )
};
export default DoctorContextProvider;