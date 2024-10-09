import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDefinitelyInventoryById, getInventoryThunk, restoreInventoryById } from '../../store/slices/inventory.slice'
import { toast } from 'react-toastify'

const InventoryDeletedView = () => {

  const dispatch = useDispatch()
  const inventoryInformation = useSelector((state) => state.inventory)

  useEffect(() => {
    dispatch(getInventoryThunk())
  }, [])

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold mb-6">Lista de Inventarios</h2>

        {inventoryInformation.data.inventories?.filter(inventory => inventory.isDeleted).length > 0 ? (
          <table className='w-full table-auto'>
            <thead>
              <tr className='text-left'>
                  <th className='pb-4 w-5/12'>Producto</th>
                  <th className='pb-4 w-2/12 text-center'>Cantidad - Unidades</th>
                  <th className='pb-4 w-2/12'>Bodega</th>
                  <th className='pb-4'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inventoryInformation.data.inventories.filter(inventory => inventory.isDeleted)
                .map((inventory) => (
                  <tr key={inventory.id} className="border-t hover:bg-slate-50">
                    <td className="py-3">{!inventory.product.isDeleted 
                        ? inventory.product?.name 
                        : <p className='font-semibold text-gray-400'>{inventory.product?.name}</p>}</td>
                    <td className="py-3 text-center">{inventory?.quantity} </td>
                    <td className="py-3">{!inventory.warehouse.isDeleted 
                        ? inventory.warehouse?.name 
                        : <p className='font-semibold text-gray-400'>{inventory.warehouse?.name}</p>}</td>
                    <td>
                      <button
                        onClick={() => dispatch(restoreInventoryById(inventory.id))}
                        className="bg-orange-400 hover:bg-orange-500 text-white px-3 p-1 rounded-[10px]"
                      >
                        Renovar
                      </button>
                      <button
                        onClick={() => dispatch(deleteDefinitelyInventoryById(inventory.id))}
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

export default InventoryDeletedView