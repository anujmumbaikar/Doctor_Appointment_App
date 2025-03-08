import { createContext } from 'react'
import { doctors } from '../assets/assets'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
export const AppContext = createContext()

const AppContextProvider = ({children})=>{
    const currencySymbol = '$' 
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || false);
    const [doctors, setDoctors] = useState([])
    const getDoctorsData = async ()=>{
        try{
            const {data} = await axios.get(`${backendUrl}/api/v1/doctor/list`)
            if(data.success){
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }
    const value = {
        doctors,currencySymbol,accessToken,setAccessToken,backendUrl
    
    }
    useEffect(()=>{
        getDoctorsData()
    },[])
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )


}
export default  AppContextProvider