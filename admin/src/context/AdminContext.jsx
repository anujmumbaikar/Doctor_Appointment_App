import { createContext } from "react";
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {

    const [adminToken, setAdminToken] = React.useState(localStorage.getItem('adminToken') || null);
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    //in frontend we can access the environment variables by using import.meta.env.VITE_VARIABLE_NAME
    //we we have nodejs environment variables we can access them by using process.env.VARIABLE_NAME
    //this doent support dynamic variables like process.env.---
    
    const [doctors,setDoctors] = React.useState([]);
    const getAllDoctors = async()=>{
        try {
            const {data} = await axios.post(`${backendurl}/api/v1/admin/all-doctors`,{},{headers:{'Authorization':`Bearer ${adminToken}`}});
            if(data.success){
                setDoctors(data.data.doctors);
                console.log(data.data.doctors);
                
            }else{
                toast.error(data.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(
                `${backendurl}/api/v1/admin/change-availability`,
                { docId },
                { headers: { 'Authorization': `Bearer ${adminToken}` } }
            );
            console.log(data);
            
            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            }
        } catch (error) {
           
        }
    };
    
    const value = {
        adminToken,
        setAdminToken,
        backendurl,
        doctors,
        getAllDoctors,
        changeAvailability
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
};
export default AdminContextProvider;