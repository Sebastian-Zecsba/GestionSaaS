import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Deletedlayout = () => {
  return (
    <div>
        <header className='bg-[#EDEDED]  rounded-[10px] h-20 flex justify-evenly items-center'>
          <Link className='bg-slate-200 hover:cursor-pointer rounded-xl p-2' to="/categorias/del">
              Categorias
          </Link>
          <Link className='bg-slate-200 hover:cursor-pointer rounded-xl p-2' to="/categorias/del">
              Productos
          </Link>
          <Link className='bg-slate-200 hover:cursor-pointer rounded-xl p-2' to="/categorias/del">
              Bodegas
          </Link>
          <Link className='bg-slate-200 hover:cursor-pointer rounded-xl p-2' to="/categorias/del">
              Inventarios
          </Link>
          <Link className='bg-slate-200 hover:cursor-pointer rounded-xl p-2' to="/categorias/del">
              Proveedores
          </Link>
        </header>
          
        <div className="h-screen flex-1 p-7">
          <Outlet />
        </div>
    </div>
  )
}

export default Deletedlayout