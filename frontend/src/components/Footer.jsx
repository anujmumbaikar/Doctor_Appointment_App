import React from 'react'
import {assets} from '../assets/assets.js'
function Footer() {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img className="mb-5 w-40" src={assets.logo} alt="" />
                <p className='w-full md:2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos nihil rem obcaecati ad modi repellat blanditiis numquam voluptas quis ex! Cumque, corporis fuga quas repudiandae magnam quasi repellat quos autem!
                Saepe veritatis voluptates deleniti ducimus laudantium quam aut praesentium, laboriosam similique. Illum commodi libero mollitia expedita autem, distinctio at natus, fuga itaque repellendus officia rem id aspernatur vel labore error?</p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+19 2243 03432</li>
                    <li>anujmumbaikar120405@gamil.com</li>
                </ul>
            </div>
        </div>
        <div className='text-center w-full absolute button-0 left-0'>
            <hr />
            <p>© 2021 All Rights Reserved. Designed by Anuj Mumbaikar</p>
        </div>
    </div>
  )
}

export default Footer