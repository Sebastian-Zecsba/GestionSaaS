import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDefinitelyProductById, getProductsThunk, restoreProductById } from '../../store/slices/product.slice';
import { toast } from 'react-toastify';

const ProductsDeletedView = () => {

  const dispatch = useDispatch()
  const products = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold mb-6">Lista de Productos</h2>

        {products.data.products?.filter(product => product.isDeleted).length > 0 ? (
          <table className='w-full table-auto'>
            <thead>
              <tr className='text-left'>
                  <th className='pb-4'>SKU</th>
                  <th className='pb-4'>Nombre</th>
                  <th className='pb-4'>Descripción</th>
                  <th className='pb-4'>Precio</th>
                  <th className='pb-4'>Categoria</th>
                  <th className="pb-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.data.products.filter(product => product.isDeleted)
                .map((product) => (
                  <tr key={product.id} className="border-t hover:bg-slate-50">
                    <td className="py-3">{product.sku}</td>
                    <td className="py-3">{product.name}</td>
                    <td className="py-3">{product.description}</td>
                    <td className="py-3">{product.price.toLocaleString('es-ES')}</td>
                    <td className="py-3">{product.category.isDeleted ? <p className='font-semibold text-gray-400'>{product.category.name}</p> :  product.category.name}</td>
                    <td>
                    <button
                      onClick={() => dispatch(restoreProductById(product.id))}
                      className="bg-orange-400 hover:bg-orange-500 text-white px-3 p-1 rounded-[10px]"
                    >
                      Renovar
                    </button>
                    <button
                      onClick={() => dispatch(deleteDefinitelyProductById(product.id))}
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

export default ProductsDeletedView