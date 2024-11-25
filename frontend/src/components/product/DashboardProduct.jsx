import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductThunk, getProductsThunk } from '../../store/slices/product.slice'
import CreateProduct from './CreateProduct'
import { useNavigate } from 'react-router-dom'
import EditProduct from './EditProduct'
import Pagination from '../Pagination'
import ButtonCreate from '../ButtonCreate'

const DashboardProduct = ({searchTerm}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product) 

  const [ currentPage, setCurrentPage] = useState(1)
  console.log(products)
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

  const productsFiltered = products.data.products?.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const pages = Math.ceil(products.data.total / products.data.limit)

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6 min-w-80">
      <h2 className="text-3xl font-bold mb-6">Lista de Productos</h2>

        {productsFiltered?.length > 0 ? (
          <div className='overflow-x-auto'>
            <table className='w-full table-fixed border-collapse'>
            <thead>
              <tr className='text-left'>
                  <th className='pb-4 w-[80px] sm:w-[100px] min-w-[150px] sm:min-w-[100px] whitespace-nowrap'>SKU</th>
                  <th className='pb-4 w-[150px] sm:w-[200px] min-w-[150px] sm:min-w-[200px] whitespace-nowrap'>Nombre</th>
                  <th className="pb-4 w-[300px] sm:w-[400px] min-w-[300px] sm:min-w-[400px] whitespace-nowrap">Descripción</th>
                  <th className='pb-4 w-[150px] sm:w-[200px] min-w-[150px] sm:min-w-[200px] whitespace-nowrap'>Precio</th>
                  <th className='pb-4 w-[150px] sm:w-[200px] min-w-[150px] sm:min-w-[200px] whitespace-nowrap'>Categoria</th>
                  <th className="pb-4 w-[150px] sm:w-[200px] min-w-[150px] sm:min-w-[200px] whitespace-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productsFiltered.filter(product => !product.isDeleted)
                .map((product) => (
                  <tr key={product.id} className="border-t hover:bg-slate-50">
                    <td className="py-3 w-[80px] sm:w-[100px] min-w-[150px] sm:min-w-[100px] whitespace-nowrap">{product.sku}</td>
                    <td className="py-3 w-[150px] sm:w-[200px] min-w-[150px] sm:min-w-[200px] whitespace-nowrap">{product.name}</td>
                    <td className="py-3 w-[300px] sm:w-[400px] min-w-[300px] sm:min-w-[400px] whitespace-nowrap">{product.description}</td>
                    <td className="py-3 pb-4 w-[150px] sm:w-[200px] min-w-[150px] sm:min-w-[200px] whitespace-nowrap">{product.price.toLocaleString('es-ES')}</td>
                    <td className="py-3">{product.category.isDeleted ? <p className='font-semibold text-gray-400'>{product.category.name}</p> :  product.category.name}</td>
                    <td className='py-3 flex flex-row'>
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
        </div>
        ) : (
          <div className="flex gap-10 py-4 items-center">
            <ButtonCreate 
              messageHeader={"No has creado algun producto, ¡crea uno!"}
              navigatePath="?producto=true"
              messageBody={"+ Agregar Producto"}
            />
          </div>
        )}

        <Pagination 
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          pages={pages}
          data={products}
        />

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