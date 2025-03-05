import React from 'react'
import { assets } from '../assets/assets.js'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
function Navbar() {

    const { adminToken,setAdminToken } = useContext(AdminContext)
    const navigate = useNavigate()

    const logout = ()=>{
        navigate('/')
        adminToken && setAdminToken('')
        adminToken && localStorage.removeItem('adminToken')
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
            <img className='cursor-pointer w-38 sm:w-40' src={assets.admin_logo} alt="" />
            <p className='border px-3 py-1 rounded-full border-gray-600 text-gray-600'>
                {
                    adminToken ? 'Admin' : 'Doctor'
                }
            </p>
        </div>
        <button onClick={logout} className='bg-blue-500 text-white text-sm px-8 py-3 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar