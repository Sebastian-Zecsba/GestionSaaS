import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { loginThunk } from '../../store/slices/user.slice';
import { useDispatch } from 'react-redux'

const LoginView = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  const login = (data) => {
    const { email, password} = data;
    if(!email || !password){
      console.log('Datos son obligatorios')
      return;
    }
    dispatch(loginThunk({email, password}, navigate));
  }

  return (
    <main className='bg-white p-8 w-[28rem] flex flex-col gap-4 items-center border border-slate-300 rounded-md shadow-md'>

      <h1 className='p-4 text-4xl font-semibold tracking-wider'>Bienvenido</h1>

      <form onSubmit={handleSubmit(login)}>
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
            Inicia Sesión
        </button>
      </form>

      <section className='flex gap-14 p-5'>
        <Link to="/registrar" className='hover:-translate-y-1 transition ease-in-out'>Registarse</Link>

        {/* <Link className='hover:-translate-y-1 transition ease-in-out'>Olvidaste tu Contraseña</Link> */}
      </section>

    </main>
  )
}

export default LoginView