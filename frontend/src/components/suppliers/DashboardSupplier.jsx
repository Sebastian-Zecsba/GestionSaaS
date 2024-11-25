import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSupplierThunk, getSuppliersThunk } from '../../store/slices/supplier.slice'
import Pagination from '../Pagination'
import ButtonCreate from '../ButtonCreate'
import { useNavigate } from 'react-router-dom'
import CreateSupplier from './CreateSupplier'
import EditSupplier from './EditSupplier'
// import CreateSupplier from './CreateSupplier'
// import EditSupplier from './EditSupplier'


const DashboardSupplier = ({searchTerm}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const supplierInformation = useSelector((state) => state.supplier)

    const [ currentPage, setCurrentPage] = useState(1)

    const fetchSupplier = useCallback((page, searchTerm) => {
      const url = `/suppliers?page=${page}&limit=10`
      dispatch(getSuppliersThunk(url, searchTerm))
    })

    useEffect(() => {
      fetchSupplier(currentPage)
    }, [searchTerm])

    const handleNextPage = () => {
      if (supplierInformation) {
        fetchSupplier(currentPage + 1);
        setCurrentPage(currentPage + 1);
      }
    };

    const handlePrevPage = () => {
      if (supplierInformation) {
        fetchSupplier(currentPage - 1);
        setCurrentPage(currentPage - 1);
      }
    };

    const supplierFiltered = supplierInformation.data.suppliers?.filter(supplier => supplier.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const pages = Math.ceil(supplierInformation.data.total / supplierInformation.data.limit)

    return (
        <div className="p-6 bg-white rounded-lg shadow-md mt-6">
          <h2 className="text-3xl font-bold mb-6">Lista de las Bodegas</h2>
    
            {supplierFiltered?.length > 0 ? (
             <div className='overflow-x-auto'>
               <table className="w-full table-fixed border-collapse">
                <thead>
                  <tr className='text-left'>
                      <th className='pb-4 w-[150px] sm:w-[200px] min-w-[150px] sm:min-w-[200px] lg:w-3/12 whitespace-nowrap'>Nombre</th>
                      <th className='pb-4 w-[150px] sm:w-[200px] min-w-[150px] sm:min-w-[200px] whitespace-nowrap md:w-2/12 lg:w-3/12'>Dirección</th>
                      <th className='pb-4 w-[250px] sm:w-[200px] min-w-[150px] sm:min-w-[200px] whitespace-nowrap md:w-[200px] lg:min-w-[220px] lg:w-5/12 '>Correo</th>
                      <th className='pb-4 w-[150px] sm:w-[200px] min-w-[150px] sm:min-w-[200px] whitespace-nowrap md:w-2/12 lg:w-2/12'>Telefono</th>
                      <th className='pb-4 lg:w-3/12'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {supplierFiltered.filter(supplier => !supplier.isDeleted)
                    .map((supplier) => (
                      <tr key={supplier.id} className="border-t hover:bg-slate-50">
                        <td className="py-3">{supplier.name}</td>
                        <td className="py-3">{supplier.address}</td>
                        <td className="py-3">{supplier.email}</td>
                        <td className="py-3">{supplier.phone}</td>
                        <td className='py-3 flex flex-row'>
                          <button
                          onClick={() => navigate(`?editarProveedor=${supplier.id}`)}
                          className="mr-3 bg-blue-500 hover:bg-blue-700 text-white px-3 p-1 rounded-[10px]"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => dispatch(deleteSupplierThunk(supplier.id, currentPage))}
                          className="bg-red-500 hover:bg-red-700 text-white px-3 p-1 rounded-[10px]"
                        >
                          Eliminar
                        </button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
             </div>
            ) : (
              <div className="flex gap-10 py-4 items-center">
                <ButtonCreate
                  messageHeader={"No has agregado un proveedor"}
                  navigatePath="?proveedor=true"
                  messageBody={"+ Agregar Proveedor"}
                />
              </div>
            )}
    
            <Pagination 
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              currentPage={currentPage}
              pages={pages}
              data={supplierInformation}
            />

            <CreateSupplier
                currentPage={currentPage} 
            />

            <EditSupplier 
                currentPage={currentPage}
            />


        </div>
      )
}

export default DashboardSupplier