import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUserThunk } from '../../store/slices/user.slice';

const RegisterView = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleSubmit, register, reset } = useForm();

    const createAcount = (data) => {
        dispatch(createUserThunk(data, navigate));
    };

  return (
    <main className='bg-white p-8 w-[28rem] flex flex-col gap-4 items-center border border-slate-300 rounded-md shadow-md'>

      <h1 className='p-4 text-4xl font-semibold tracking-wider'>Crea una cuenta</h1>

      <form onSubmit={handleSubmit(createAcount)}>

        <section className='flex flex-col gap-1 text-lg'>
          <label htmlFor="name">Nombre Completo </label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            className='bg-[#EDEDED] rounded-md p-1 w-64 shadow-md'
            {...register('name')}
          />
        </section>

        <section className='flex flex-col gap-1 text-lg'>
          <label htmlFor="email">Correo </label>
          <input 
            type="text" 
            name="email" 
            id="email" 
            className='bg-[#EDEDED] rounded-md p-1 w-64 shadow-md'
            {...register('email')}
          />
        </section>

        <section className='flex flex-col gap-1 text-lg'>
          <label htmlFor="password">Contraseña </label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            className='bg-[#EDEDED] rounded-md p-1 w-64 shadow-md'
            {...register('password')}
          />
        </section>

        <button 
          type="submit"
          className='w-64 p-1 text-lg text-white font-medium mt-6 tracking-wider rounded-md bg-blue-500 hover:bg-blue-700'>
            Crear Cuenta
        </button>
      </form>

      <section className='flex gap-14 p-5'>
        <Link to="/login" className='hover:-translate-y-1 transition ease-in-out'>Inicia Sesión</Link>

        {/* <Link className='hover:-translate-y-1 transition ease-in-out'>Olvidaste tu Contraseña</Link> */}
      </section>

    </main>
  )
}

export default RegisterView