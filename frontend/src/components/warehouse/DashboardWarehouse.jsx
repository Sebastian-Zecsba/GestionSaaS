import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteWarehouseById, getWarehousesThunk } from '../../store/slices/warehouse.slice'
import Pagination from '../Pagination'
import ButtonCreate from '../ButtonCreate'
import { useNavigate } from 'react-router-dom'
import CreateWarehouse from './CreateWarehouse'
import EditWarehouse from './EditWarehouse'

const DashboardWarehouse = ({searchTerm}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const warehouseInformation = useSelector((state) => state.warehouse)

  const [ currentPage, setCurrentPage] = useState(1)

  const fetchWarehouse = useCallback((page, searchTerm) => {
    const url = `/warehouses?page=${page}&limit=10`
    dispatch(getWarehousesThunk(url, searchTerm))
  })

  useEffect(() => {
    fetchWarehouse(currentPage, searchTerm)
  }, [searchTerm])

  const handleNextPage = () => {
    if (warehouseInformation) {
      fetchWarehouse(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (warehouseInformation) {
      fetchWarehouse(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const warehouseFiltered = warehouseInformation.data.warehouses?.filter(warehouse => warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const pages = Math.ceil(warehouseInformation.data.total / warehouseInformation.data.limit)

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6 min-w-80">
      <h2 className="text-3xl font-bold mb-6">Lista de las Bodegas</h2>

        {warehouseFiltered?.length > 0 ? (
          <div className='overflow-x-auto'>
            <table className="w-full table-fixed border-collapse">
              <thead>
                <tr className='text-left'>
                    <th className="pb-4 w-[150px] sm:w-[200px] md:w-4/12 min-w-[150px] sm:min-w-[200px]  whitespace-nowrap">Nombre</th>
                    <th className="pb-4 w-[150px] sm:w-[200px] md:w-6/12 min-w-[150px] sm:min-w-[200px] whitespace-nowrap">Dirección</th>
                </tr>
              </thead>
              <tbody>
                {warehouseFiltered.filter(warehouse => !warehouse.isDeleted)
                  .map((warehouse) => (
                    <tr key={warehouse.id} className="border-t hover:bg-slate-50">
                      <td className="py-3">{warehouse.name}</td>
                      <td className="py-3">{warehouse.address}</td>
                      <td className='py-3 flex flex-row'>
                        <button
                        onClick={() => navigate(`?editarBodega=${warehouse.id}`)}
                        className="mr-3 bg-blue-500 hover:bg-blue-700 text-white px-3 p-1 rounded-[10px]"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => dispatch(deleteWarehouseById(warehouse.id, currentPage))}
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
              messageHeader={"No has creado una Bodega, ¡crea una!"}
              navigatePath="?bodega=true"
              messageBody={"+ Agregar Bodega"}
            />
          </div>
        )}

        <Pagination 
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          pages={pages}
          data={warehouseInformation}
        />

        <CreateWarehouse 
          currentPage={currentPage}
        />

        <EditWarehouse 
          currentPage={currentPage}
        />

    </div>
  )
}

export default DashboardWarehouse