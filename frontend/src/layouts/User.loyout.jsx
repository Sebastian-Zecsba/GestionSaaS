import React from 'react'
import { Outlet } from 'react-router-dom'

const Login = () => {
  return (
    <div className='bg-[#EDEDED] h-screen flex justify-center items-center'>
        <Outlet />
    </div>

  )
}

export default Login