import React, { useState} from 'react'
import { Header } from '../../components'
import ButtonCreate from '../../components/ButtonCreate'
import DashboardSupplier from '../../components/suppliers/DashboardSupplier'

const SuppliersView = () => {
    const [searchTerm, setSearchTerm ] = useState('')

    return (
      <div className='ml-16'>
          <header className='flex justify-between bg-[#EDEDED] px-5 py-4 rounded-[10px]'>
              <section className='flex'>
                  <div>
                      <Header 
                          title="Proveedores"
                      />
                  </div>  
                  <div className='ml-28 flex justify-center'>
                      <ButtonCreate 
                          navigatePath="?proveedor=true"
                          messageBody={"+ Agregar Proveedor"}
                      />
                  </div>
              </section>
  
              <section className='flex justify-center bg-[#EDEDED] rounded-[10px] items-center mr-20 w-96 border-2 border-gray-400'>
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
            <DashboardSupplier 
                searchTerm={searchTerm}
            />
          </main>

      </div>
    )
}

export default SuppliersView