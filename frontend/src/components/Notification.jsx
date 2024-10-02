import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const { message, variant, show } = useSelector(state => state.app.notification);

  return (
    <div className='fixed top-0 right-0 z-50 flex w-full justify-end'>
      <div className={`${show ? 'block' : 'hidden'} fixed top-5 right-10 z-50 flex w-80 flex-col gap-4 rounded-lg bg-[#fff3f2] border-red-500 p-4 text-left align-middle shadow-xl transition-all duration-300 ease-in-out`}>
        <h2 className='text-xl font-semibold text-[#ee4d63]'>Error: <p className='text-red-500 font-normal'>{message}</p></h2>
      </div>
    </div>
  );
}

export default Notification;
