import React, { useState } from 'react'
import { Header } from '../../components'
import { useNavigate } from 'react-router-dom'
import DashboardProduct from '../../components/product/DashboardProduct'

const ProductsView = () => {

  const navigate = useNavigate()
  const [searchTerm, setSearchTerm ] = useState('')

  return (
    <div className='ml-16'>
    <header className='flex justify-between bg-[#EDEDED] px-5 py-4 rounded-[10px]'>
        <section className='flex'>
            <div>
                <Header 
                    title="Productos"
                />
            </div>  
            <div className='ml-28 flex justify-center'>
                <button
                    type='button'
                    className='bg-blue-500 hover:bg-blue-700 px-10 font-normal text-white rounded-[10px] text-xl'
                    onClick={() => navigate(location.pathname + '?producto=true')}
                > + Agregar Producto </button>
            </div>
        </section>

        <section className='flex justify-center bg-[#EDEDED] rounded-[10px] items-center mr-20 w-96 border-2 border-gray-400'>
            <img src="./src/assets/lupa.svg" className='w-8 h-8 mx-2' />
            <input 
                className='bg-[#EDEDED] text-[#a8a6a7] w-full focus:outline-none text-lg' 
                type="text" 
                placeholder="Buscar..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </section>
    </header>

    <main> 
        <DashboardProduct 
            searchTerm={searchTerm}
        />
    </main>
</div>
  )
}

export default ProductsView