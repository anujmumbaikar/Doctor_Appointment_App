import React from 'react'
import { assets } from '../assets/assets'
function Banner() {
  return (
    <div className='flex bg-blue-500 rounded-lg px-6 sm:px-10 md:px-14 lg:ps-12 my-20 md:mx-10'>
        <div>
            <div>
                <p>Book Appointment</p>
                <p>With 100+ trusted Doctors</p>
            </div>
            <button>Create account</button>
        </div>
        <div>
            <img src={assets.appointment_img} alt="" />
        </div>
    </div>
  )
}

export default Banner