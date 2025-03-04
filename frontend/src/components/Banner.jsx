import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
function Banner() {
    const navigate = useNavigate()
  return (
    <div className='flex bg-blue-500 rounded-lg px-6 sm:px-10 md:px-14 lg:ps-12 my-40 md:mx-10 py-10'>
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-14'>
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white'>
                <p>Book Appointment</p>
                <p>With 100+ trusted Doctors</p>
            </div>
            <button
            onClick={()=>navigate('/login')} 
            className='bg-white text-sm text-gray-600 mt-4 px-8 py-3 rounded-4xl hover:scale-105 transition-all duration-300'>Create account</button>
        </div>
        <div className='hidden md:block md:1/2 lg:w-[370px] relative'>
            <img className="w-full absolute bottom-0 right-0" src={assets.appointment_img} alt="" />
        </div>
    </div>
  )
}

export default Banner