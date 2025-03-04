import React, { useContext, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import {AppContext} from '../context/AppContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Doctors() {
  const {speciality} = useParams()
  const navigate = useNavigate();
  const [filterDoc,setFilterDoc] = useState([])
  const {doctors} = useContext(AppContext)
  const applyFilter = ()=>{
    if(speciality){
      const newDoc = doctors.filter((items)=>items.speciality === speciality)
      setFilterDoc(newDoc)
    }else{
      setFilterDoc(doctors)
    }
  }
  useEffect(()=>{
    applyFilter()
  },[doctors,speciality])
  return (
    <div className='flex gap-4' >
      <div className=''>
      <p className='text-gray-600 text-2xl font-bold pb-4'>Browse through the doctors speciality</p>
        <div className='flex flex-col gap-4 text-gray-600'>
          <p onClick={()=>speciality==="General physician"? navigate('/doctors'):navigate('/doctors/General physician')} className={`sm:w-auto pl-3 py-1.5 pr-2 border border-gray-400 ${speciality === "General physician"? "bg-indigo-50 text-black":""}`}>General Physician</p>
          <p onClick={()=>speciality==="Gynecologist"? navigate('/doctors'):navigate('/doctors/Gynecologist')} className={`sm:w-auto pl-3 py-1.5 pr-2 border border-gray-400 ${speciality === "Gynecologist"? "bg-indigo-50 text-black":""}`}>Gynecologist</p>
          <p onClick={()=>speciality==="Dermatologist"? navigate('/doctors'):navigate('/doctors/Dermatologist')} className={`sm:w-auto pl-3 py-1.5 pr-2 border border-gray-400 ${speciality === "Dermatologist"? "bg-indigo-50 text-black":""}`}>Dermatologist</p>
          <p onClick={()=>speciality==="Pediatricians"? navigate('/doctors'):navigate('/doctors/Pediatricians')} className={`sm:w-auto pl-3 py-1.5 pr-2 border border-gray-400 ${speciality === "Pediatricians"? "bg-indigo-50 text-black":""}`}>Pediatricians</p>
          <p onClick={()=>speciality==="Neurologist"? navigate('/doctors'):navigate('/doctors/Neurologist')} className={`sm:w-auto pl-3 py-1.5 pr-2 border border-gray-400 ${speciality === "Neurologist"? "bg-indigo-50 text-black":""}`}>Neurologist</p>
          <p onClick={()=>speciality==="Gastroenterologist"? navigate('/doctors'):navigate('/doctors/Gastroenterologist')} className={`sm:w-auto pl-3 py-1.5 pr-2 border border-gray-400 ${speciality === "Gastroenterologist"? "bg-indigo-50 text-black":""}`}>Gastroenterologist</p>
        </div>
      </div>
      <div className='grid grid-cols-4 gap-4 ml-5'>
        {
          filterDoc.map((items,index)=>(
            <div key={index} onClick={()=>navigate(`/appointment/${items._id}`)} className='border border-blue-500 overflow-hidden cursor-pointer hover:scale-105 transform transition-all duration-300 rounded-2xl'>
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
    </div>
  )
}

export default Doctors