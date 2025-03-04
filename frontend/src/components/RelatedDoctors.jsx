import React, { use } from 'react'
import { useContext,useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
function RelatedDoctors({speciality,docId}) {
    const {doctors} = useContext(AppContext)
    const navigate = useNavigate()
    const [relDoc , setRelDocs] = useState([])


    useEffect(() => {
        if(doctors.length > 0 && speciality){
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDocs(doctorsData)
        }
    },[doctors,speciality,docId])
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-700 md:mx-10'>
        <h1 className='text-3xl font-bold'>Top Doctors To Book</h1>
        <p className='text-center text-sm sm:w-1/2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, atque.</p>
        <div className='w-full grid grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-6 rounded-2xl'>
            {
                relDoc.slice(0,5).map((items,index)=>(
                    <div key={index} onClick={()=>{navigate(`/appointment/${items._id}`);scrollTo(0,0)}} className='border border-blue-500 overflow-hidden cursor-pointer hover:scale-105 transform transition-all duration-300 rounded-2xl'>
                        <img src={items.image} alt="" className='bg-blue-50' />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-center text-green-600'>
                                <p className='w-2 h-2 rounded-full bg-green-600'></p><p>Available</p>
                            </div>
                            <p className='text-lg font-medium'>{items.name}</p>
                            <p className='text-sm font-light'>{items.speciality}</p>
                        </div>
                    </div>
                ))
            }
        </div>
        <button 
        onClick={()=>{navigate('/doctors'); scrollTo(0,0)}}
        className='px-6 py-3 rounded-4xl bg-gray-500 text-white hover:bg-gray-700' 
        >More</button>
    </div>
  )
}

export default RelatedDoctors