import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDefinitelyWarehouseById, getWarehousesThunk, restoreWarehouseById } from '../../store/slices/warehouse.slice'
import { toast } from 'react-toastify'

const WarehousesDeletedView = () => {

  const dispatch = useDispatch()
  const warehouseInformation = useSelector((state) => state.warehouse)

  useEffect(() => {
    dispatch(getWarehousesThunk())
  }, [])

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold mb-6">Lista de Bodegas</h2>

        {warehouseInformation.data.warehouses?.filter(warehouse => warehouse.isDeleted).length > 0 ? (
          <table className='w-full table-auto'>
            <thead>
              <tr className='text-left'>
                  <th className='pb-4 w-5/12'>Nombre</th>
                  <th className='pb-4 w-5/12'>Dirección</th>
              </tr>
            </thead>
            <tbody>
              {warehouseInformation.data.warehouses.filter(warehouse => warehouse.isDeleted)
                .map((warehouse) => (
                  <tr key={warehouse.id} className="border-t hover:bg-slate-50">
                    <td className="py-3">{warehouse.name}</td>
                    <td className="py-3">{warehouse.address}</td>
                    <td>
                    <button
                      onClick={() => dispatch(restoreWarehouseById(warehouse.id))}
                      className="bg-orange-400 hover:bg-orange-500 text-white px-3 p-1 rounded-[10px]"
                    >
                      Renovar
                    </button>
                    <button
                      onClick={() => dispatch(deleteDefinitelyWarehouseById(warehouse.id))}
                      className="bg-red-500 hover:bg-red-700 text-white px-3 p-1 rounded-[10px]" 
                    >
                      Eliminar Definitivamente
                    </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="flex gap-10 py-4 items-center">
            <p>No tienes aun nada eliminado</p>
          </div>
        )}

    </div>
  )
}

export default WarehousesDeletedView