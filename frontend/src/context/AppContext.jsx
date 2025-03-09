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
    const [userData, setUserData] = useState(false)
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
    useEffect(()=>{
        getDoctorsData()
    },[])

    const loadUserProfileData = async()=>{
        try {
            const {data} = await axios.get(`${backendUrl}/api/v1/user/my-profile`,{
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }})
            if(data.success){
                setUserData(data.data)
            }else{
                toast.error(data.message)
                console.log(data.message);
                
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        if(accessToken){
            loadUserProfileData()
        }else{
            setUserData(false)
        }
    },[accessToken])

    const value = {
        doctors,currencySymbol,accessToken,setAccessToken,backendUrl,userData,setUserData,loadUserProfileData
    
    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )


}
export default  AppContextProvider