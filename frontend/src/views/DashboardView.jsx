import { Link } from 'react-router-dom'
import React from 'react'
import { Header } from '../components'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesThunk } from '../store/slices/category.slice';
import { getProductsThunk } from '../store/slices/product.slice';
import { getWarehousesThunk } from '../store/slices/warehouse.slice';
import { getInventoryThunk } from '../store/slices/inventory.slice';
import { getMovementsThunk } from '../store/slices/movements.slice';

const  DashboardView = () => {

    const dispatch = useDispatch();
    const categoryInformation = useSelector((state) => state.category.data.total);
    const productInformation = useSelector((state) => state.product.data.total);
    const warehouseInformation = useSelector((state) => state.warehouse.data.total);
    const inventoryInformation = useSelector((state) => state.inventory.data.total);
    const movementInformation = useSelector((state) => state.movement.data.total);

    useEffect(() => {
      dispatch(getCategoriesThunk());
      dispatch(getProductsThunk());
      dispatch(getWarehousesThunk());
      dispatch(getInventoryThunk());
      dispatch(getMovementsThunk());
    }, []);

    const Menus = [
        { title: "Categorias", srcLogo: "categorias", src: "/categorias", howMany: categoryInformation },
        { title: "Productos", srcLogo: "productos", src: "/productos", howMany: productInformation },
        { title: "Bogedas", srcLogo: "bodegas", src: "/bodegas", howMany: warehouseInformation },
        { title: "Inventario", srcLogo: "inventario", src: "/inventario", howMany: inventoryInformation },
        { title: "Proveedores", srcLogo: "proveedores", src: "/", howMany: categoryInformation},
        { title: "Movimientos", srcLogo: "movimientos", src: "/movimientos", howMany: movementInformation }
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
                    <section 
                        className='bg-[#EDEDED] p-5 rounded-md w-96 shadow hover:shadow-lg transition ease-in-out hover:scale-105 duration-150'>
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