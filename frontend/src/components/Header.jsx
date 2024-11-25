import React from 'react'

const Header = ({title}) => {
  return (
    <div className='bg-[#EDEDED] rounded-[10px] '>
        <h1 className='text-5xl font-semibold text-center sm:text-left'>{title}</h1>
    </div>
  )
}

export default Header