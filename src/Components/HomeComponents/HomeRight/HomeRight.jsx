import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeRight = () => {
  return (
    <div className='bg-customBlack w-[90%] bg-opacity-40'>
      <Outlet/>
    </div>
  )
}

export default HomeRight