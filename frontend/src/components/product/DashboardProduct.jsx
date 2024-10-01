import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductThunk, getProductsThunk } from '../../store/slices/product.slice'
import CreateProduct from './CreateProduct'
import { useNavigate } from 'react-router-dom'
import EditProduct from './EditProduct'

const DashboardProduct = ({searchTerm}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product) 

  const [ currentPage, setCurrentPage] = useState(1)

  const fetchProducts = useCallback((page, searchTerm) => {
    const url = `/products?page=${page}&limit=10`
    dispatch(getProductsThunk(url, searchTerm))
  })

  useEffect(() =>{ 
    fetchProducts(currentPage, searchTerm)
  }, [searchTerm])

  const handleNextPage = () => {
    if (products) {
      fetchProducts(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (products) {
      fetchProducts(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const productsFiltered = products.arrayProducts.products?.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const pages = Math.ceil(products.arrayProducts.total / products.arrayProducts.limit)

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold mb-6">Lista de Productos</h2>

        {productsFiltered?.length > 0 ? (
          <table className='w-full table-auto'>
            <thead>
              <tr className='text-left'>
                  <th className='pb-4'>Nombre</th>
                  <th className='pb-4'>Descripción</th>
                  <th className='pb-4'>Precio</th>
                  <th className='pb-4'>Cantidad</th>
                  <th className='pb-4'>Categoria</th>
                  <th className="pb-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productsFiltered.map((product) => (
                <tr key={product.id} className="border-t hover:bg-slate-50">
                  <td className="py-3">{product.name}</td>
                  <td className="py-3">{product.description}</td>
                  <td className="py-3">{product.price}</td>
                  <td className="py-3">{product.stock}</td>
                  <td className="py-3">{product.category ? product.category.name : <p className='font-semibold'>Categoria eliminada</p>}</td>
                  <td>
                    <button
                    onClick={() => navigate(`?editarProducto=${product.id}`)}
                    className="mr-3 bg-blue-500 hover:bg-blue-700 text-white px-3 p-1 rounded-[10px]"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => dispatch(deleteProductThunk(product.id, currentPage))}
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
            <h2 className="text-lg">No has creado algun producto, ¡crea uno!</h2>
            <button
                type='button'
                className='bg-blue-500 hover:bg-blue-700 px-10 font-normal text-white rounded-[10px] text-xl p-[10px]'
                onClick={() => navigate(location.pathname + '?producto=true')}
            > + Agregar Categoria </button>
          </div>
        )}

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={!products.arrayProducts.prev}
          className={`p-2 rounded bg-blue-500 text-white hover:bg-blue-700 ${ !products.arrayProducts.prev ? "opacity-50 cursor-not-allowed" : "" }`}
        >
          ⬅️ Anterior
        </button>

        <span className="text-lg">
          Página {currentPage} de {pages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage > pages - 1}
          className={`p-2 rounded bg-blue-500 text-white hover:bg-blue-700 ${ currentPage > pages - 1 ? "opacity-50 cursor-not-allowed" : "" }`}
        >
          Siguiente ➡️
        </button>
      </div>

    <CreateProduct 
      currentPage={currentPage}
    />
    <EditProduct 
      currentPage={currentPage}
    />
    </div>
  )
}

export default DashboardProduct