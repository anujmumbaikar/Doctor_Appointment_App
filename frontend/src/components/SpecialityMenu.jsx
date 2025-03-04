import React from 'react'
import { assets } from '../assets/assets'
import { specialityData } from '../assets/assets'
import {Link} from 'react-router-dom'
function SpecialityMenu() {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-gray-500'>
        <h1 className='text-3xl font-medium'>Find by Speciality</h1>
        <p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
        <div className='flex sm:justify-center gap-4 pt-5 w-full'>
            {
                specialityData.map((items,index)=>(
                    <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer hover:scale-125 transition-all duration-300' to={`/speciality/${items.id}`} key={index}>
                        <img className='w-16 sm:w-16 flex flex-col items-center mb-2' src={items.image} alt="" />
                        <p>{items.speciality}</p>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default SpecialityMenu