import React from 'react'
import { useNavigate } from 'react-router-dom'

const ButtonCreate = ({messageHeader, navigatePath, messageBody}) => {

    const navigate = useNavigate()

  return (
    <div className='flex flex-col sm:flex-row gap-4'>
        <h2 className={messageBody ? "block text-lg" : "hidden"}>{messageHeader}</h2>
        <button
            type='button'
            className='bg-blue-500 hover:bg-blue-700 px-10 font-normal text-white rounded-[10px] text-xl p-[10px]'
            onClick={() => navigate(location.pathname + navigatePath)}
        > {messageBody} </button>
    </div>
  )
}

export default ButtonCreate