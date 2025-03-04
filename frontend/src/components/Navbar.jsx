import React from 'react'
import {assets} from "../assets/assets"
import {NavLink,Link, useNavigate} from 'react-router-dom'
function Navbar() {
  const navigate = useNavigate();
  const [showMenu,setShowMenu] = React.useState(false)
  const [token,setToken] = React.useState(true)
  //if we hv token means user is logged in if false means user is not logged in
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-200'>
        <img onClick={()=>navigate("/")} src={assets.logo} alt="" className='w-44 cursor-pointer' />
        <ul className='hidden md:flex items-start gap-5 font-medium'>
          <NavLink to="/"
          className={({isActive})=>`${isActive? "text-blue-500" : "text-black hover:text-blue-500"}`}>
            <li className="py-1">Home</li>
            <hr className='border-none outline-none '/>
          </NavLink>
          <NavLink to="/doctors"
          className={({isActive})=>`${isActive? "text-blue-500" : "text-black hover:text-blue-500"}`}>
            <li className="py-1">All Doctors</li>
            <hr className='border-none outline-none '/>
          </NavLink>
          <NavLink to="/about"
          className={({isActive})=>`${isActive? "text-blue-500" : "text-black hover:text-blue-500"}`}>
            <li className="py-1">About</li>
            <hr className='border-none outline-none '/>
          </NavLink>
          <NavLink to="/contact"
          className={({isActive})=>`${isActive? "text-blue-500" : "text-black hover:text-blue-500"}`}>
            <li className="py-1">Contact</li>
            <hr className='border-none outline-none '/>
          </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
          {
            token?
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img src={assets.profile_pic} alt="" className='w-11 rounded-full'/>
              <img src={assets.dropdown_icon} alt="" className='w-2.5'/>
              <div className='absolute top-0 right-0 pt-14 font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-60 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={()=>navigate("/my-profile")} className='hover:text-black cursor-pointer'>My profile</p>
                  <p onClick={()=>navigate("/my-appointments")} className='hover:text-black cursor-pointer'>My appointments</p>
                  <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p> 
                </div>
              </div>
            </div>
            : <button 
            onClick={()=>navigate('/login')}
            className='bg-blue-500 text-white px-8 py-3 rounded-full font-light hidden md:block hover:bg-blue-700'>Create Account</button>
          }
          
        </div>
    </div>
  )
}

export default Navbar