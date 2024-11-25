import React, { useState } from 'react'
import { Header } from '../../components'
import DashboardProduct from '../../components/product/DashboardProduct'
import ButtonCreate from '../../components/ButtonCreate'

const ProductsView = () => {

  const [searchTerm, setSearchTerm ] = useState('')

  return (
    <div className='-ml-5 sm:ml-16'>
        <header className='flex flex-col min-w-80 lg:flex-row justify-between bg-[#EDEDED] px-5 py-4 rounded-[10px] gap-6'>
            <section className='flex flex-col sm:flex-row gap-5'>
                <div>
                    <Header 
                        title="Productos"
                    />
                </div>  
                <div className='md:ml-4 lg:ml-14 xl:ml-28 flex justify-center'>
                    <ButtonCreate 
                        navigatePath="?producto=true"
                        messageBody={"+ Agregar Producto"}
                    />
                </div>
            </section>

            <section className='flex justify-center bg-[#EDEDED] rounded-[10px] items-center lg:mr-20 w-full lg:w-96 border-2 border-gray-400'>
                <img src="./assets/lupa.svg" className='w-8 h-8 mx-2' />
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