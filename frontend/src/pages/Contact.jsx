import React from 'react'
import {assets} from '../assets/assets.js'
function Contact() {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img src={assets.contact_image} alt=""  className='w-full md:max-w-[360px]'/>
        <div className='flex flex-col gap-5 justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500'>Panvel, near Panvel railway station
            <br />sector:93 ,plot no:12 ,opposite of Orion Mall
          </p>
          <p className='text-gray-500'>Tel:99000000 <br />Email:anujmumbaikar120405@gmail.com</p>
          <p className='font-bold text-lg text-gray-600'>Careers at PRESCRIPTO</p>
          <p>Learn more about our teams and jobs openings.</p>
          <button className='bg-blue-400 text-white px-7 py-2 rounded-full hover:bg-blue-600 duration-300'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact