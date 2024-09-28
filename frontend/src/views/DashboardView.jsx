import { Link } from 'react-router-dom'
import React from 'react'
import { Header } from '../components'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesThunk } from '../store/slices/category.slice';

const  DashboardView = () => {

    const dispatch = useDispatch();
    const categoryInformation = useSelector((state) => state.category);
  
    useEffect(() => {
      dispatch(getCategoriesThunk());
    }, []);

    const Menus = [
        { title: "Categorias", srcLogo: "categorias", src: "/categories", howMany: categoryInformation.categories?.length },
        { title: "Productos", srcLogo: "productos", src: "/", howMany: categoryInformation.categories?.length },
        { title: "Bogedas", srcLogo: "bodegas", src: "/", howMany: categoryInformation.categories?.length },
        { title: "Inventario", srcLogo: "inventario", src: "/", howMany: categoryInformation.categories?.length },
        { title: "Proveedores", srcLogo: "proveedores", src: "/", howMany: categoryInformation.categories?.length},
        { title: "Movimientos", srcLogo: "movimientos", src: "/", howMany: categoryInformation.categories?.length },
      ];

  return (
    <div className='ml-16'>
        <div className='bg-[#EDEDED] px-5 py-4 rounded-[10px]'>
            <Header 
                title="Dashboard"
            />
        </div>
        <main className='flex flex-wrap gap-8 mt-24 justify-evenly'>  
            {Menus.map((element, index) => (
                <Link to={element.src} key={index}>
                    <section className='bg-[#EDEDED] p-5 rounded-md w-96'>
                        <div className='flex justify-between'>
                            <h1 className='text-2xl font-semibold'>{element.title}</h1>
                            <img src={`./src/assets/${element.srcLogo}.png`} className='w-10 h-10' />
                        </div>
                        <div className='mt-14'>
                            <h2 className='text-3xl font-semibold'>{element.howMany}</h2>
                            <p className='text-sm text-[#8d8d8d]'>Total de registros</p>
                        </div>
                    </section>
                </Link>
            ))}
        </main>
    </div>
  )
}

export default DashboardView