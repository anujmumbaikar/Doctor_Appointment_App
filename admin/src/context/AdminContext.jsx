import { createContext } from "react";
import React from 'react';
export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {

    const [adminToken, setAdminToken] = React.useState(localStorage.getItem('adminToken') || null);
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const value = {
        adminToken,
        setAdminToken,
        backendurl
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
};
export default AdminContextProvider;