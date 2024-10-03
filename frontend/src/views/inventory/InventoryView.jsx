import React, { useState } from 'react'
import ButtonCreate from '../../components/ButtonCreate'
import { Header } from '../../components'
import DashboardInventory from '../../components/inventory/DashboardInventory'

const InventoryView = () => {

    const [searchTerm, setSearchTerm ] = useState('')

  return (
    <div className='ml-16'>
        <header className='flex justify-between bg-[#EDEDED] px-5 py-4 rounded-[10px]'>
            <section className='flex'>
                <div>
                    <Header 
                        title="Inventario"
                    />
                </div>  
                <div className='ml-28 flex justify-center'>
                    <ButtonCreate 
                        navigatePath="?inventario=true"
                        messageBody={"Agregar Inventario"}
                    />
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
            <DashboardInventory 
                searchTerm={searchTerm}
            />
        </main>
    </div>
  )
}

export default InventoryView