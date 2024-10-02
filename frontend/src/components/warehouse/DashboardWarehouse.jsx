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
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold mb-6">Lista de Productos</h2>

        {warehouseFiltered?.length > 0 ? (
          <table className='w-full table-auto'>
            <thead>
              <tr className='text-left'>
                  <th className='pb-4'>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {warehouseFiltered.map((warehouse) => (
                <tr key={warehouse.id} className="border-t hover:bg-slate-50">
                  <td className="py-3">{warehouse.name}</td>
                  <td>
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