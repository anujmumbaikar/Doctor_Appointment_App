import React from 'react'
import { assets } from "../assets/assets.js"
import { AdminContext } from '../context/AdminContext.jsx'
import { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
function Login() {

  const [state, setState] = React.useState('Admin')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { setAdminToken, backendurl } = React.useContext(AdminContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Admin') {
        const response = await axios.post(`${backendurl}/api/v1/admin/login`, {
          email,
          password,
        });
        if (response.data.success) {
          const token = response.data.data.token;
          localStorage.setItem("adminToken", token);
          setAdminToken(token);
        } else {
          toast.error("Invalid credentials");
        }
      } else {
        
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Something went wrong");
    }
  };
  

  return (
    <form onSubmit={onSubmitHandler} action="" className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-2xl'>
        <p className='text-2xl font-semibold m-auto'><span className='text-blue-500'>{state}</span>Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded-2xl w-full p-2 mt-1' type="email" placeholder="" required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded-2xl w-full p-2 mt-1' type="password" placeholder="" required />
        </div>
        <button className='w-full bg-blue-400 text-white text-semibold py-3 rounded-2xl mt-4'>Login</button>
        {
          state === 'Admin' ?
            <p>Doctor Login? <span className="text-blue-500 underline cursor-pointer" onClick={() => setState('Doctor')}>Click here</span></p>
            : <p>Admin Login? <span className="text-blue-500 underline cursor-pointer" onClick={() => setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login