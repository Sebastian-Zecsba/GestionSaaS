import React, { useState, useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteInventoryByIdThunk, getInventoryThunk } from '../../store/slices/inventory.slice'
import ButtonCreate from '../ButtonCreate'
import Pagination from '../Pagination'
import CreateInventory from './CreateInventory'

const DashboardInventory = ({searchTerm}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const inventoryInformation = useSelector((state) => state.inventory)

    const [ currentPage, setCurrentPage] = useState(1)

    const fetchInventory = useCallback((page, searchTerm) => {
        const url = `/inventories?page=${page}&limit=10`
        dispatch(getInventoryThunk(url, searchTerm))
    })

    useEffect(() => {
        fetchInventory(currentPage, searchTerm)
    }, [searchTerm])

    const handleNextPage = () => {
      if (inventoryInformation) {
        fetchInventory(currentPage + 1);
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (inventoryInformation) {
        fetchInventory(currentPage - 1);
        setCurrentPage(currentPage - 1);
      }
    };

    const inventoryFiltered = inventoryInformation.data.inventories?.filter(inventory => inventory.product.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const pages = Math.ceil(inventoryInformation.data.total / inventoryInformation.data.limit)

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold mb-6">Lista del Inventario</h2>

        {inventoryFiltered?.length > 0 ? (
          <div className='overflow-x-auto'>
            <table className='w-full table-fixed border-collapse'>
              <thead>
                <tr className='text-left'>
                    <th className='pb-4 w-[150px] sm:w-[200px] md:w-3/12 lg:w-3/12 min-w-[150px] sm:min-w-[200px] whitespace-nowrap'>Producto</th>
                    <th className='pb-4 w-[250px] sm:w-[200px] md:w-4/12 lg:w-[250px] min-w-[150px] sm:min-w-[200px] whitespace-nowrap'>Cantidad - Unidades</th>
                    <th className='pb-4 w-[150px] sm:w-[200px] md:w-2/12 lg:w-5/12 min-w-[150px] sm:min-w-[200px] whitespace-nowrap'>Bodega</th>
                    <th className='pb-4 w-[150px]'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {inventoryFiltered.filter(inventory => !inventory.isDeleted)
                  .map((inventory) => (
                    <tr key={inventory.id} className="border-t hover:bg-slate-50">
                      <td className="py-3">{!inventory.product.isDeleted 
                          ? inventory.product?.name 
                          : <p className='font-semibold text-gray-400'>{inventory.product?.name}</p>}</td>
                      <td className="py-3">{inventory?.quantity} </td>
                      <td className="py-3">{!inventory.warehouse.isDeleted 
                          ? inventory.warehouse?.name 
                          : <p className='font-semibold text-gray-400'>{inventory.warehouse?.name}</p>}</td>
                      <td>
                        <button
                          onClick={() => dispatch(deleteInventoryByIdThunk(inventory.id, currentPage))}
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
              messageHeader={"No tienes inventario, agrega un stock!"}
              navigatePath="?inventario=true"
              messageBody={"Agregar inventario"}
            />
          </div>
        )}

        <Pagination 
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          pages={pages}
          data={inventoryInformation}
        />


        <CreateInventory 
          currentPage={currentPage}
        />
    </div>
  )
}

export default DashboardInventory