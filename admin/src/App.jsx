import React, { useContext } from 'react'
import { Route, Router } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
function App() {

  const { adminToken } = useContext(AdminContext)
  return adminToken ? (
    <div className='bg-[#f8f9fd]'>
      <ToastContainer />
      <Navbar/>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App