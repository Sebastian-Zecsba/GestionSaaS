import React, { useState, useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ButtonCreate from '../ButtonCreate'
import Pagination from '../Pagination'
import { getMovementsThunk } from '../../store/slices/movements.slice'
import CreateMovement from './CreateMovement'
import { formatDate } from '../../utils/formatDate'

const DashboardMovements = ({ searchTerm }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const movementsInformation = useSelector((state) => state.movement)

    const [ currentPage, setCurrentPage] = useState(1)

    const fetchMovements = useCallback((page, searchTerm) => {
        const url = `/movements?page=${page}&limit=10`
        dispatch(getMovementsThunk(url, searchTerm))
    })

    console.log(movementsInformation)

    useEffect(() => {
        fetchMovements(currentPage, searchTerm)
    }, [searchTerm])

    const handleNextPage = () => {
      if (movementsInformation) {
        fetchMovements(currentPage + 1);
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (movementsInformation) {
        fetchMovements(currentPage - 1);
        setCurrentPage(currentPage - 1);
      }
    };

    const movementsFiltered = movementsInformation.data?.movements?.filter(movement => movement.product.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const pages = Math.ceil(movementsInformation.data.total / movementsInformation.data.limit)

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold mb-6">Lista de los movimientos</h2>

        {movementsFiltered?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse">
              <thead>
                <tr className='text-left'>
                    <th className='pb-4 w-[150px] sm:w-[200px] min-w-[150px] sm:min-w-[200px] lg:w-3/12 whitespace-nowrap'>Usuario</th>
                    <th className='pb-4 w-[150px] sm:w-[200px] min-w-[150px] sm:min-w-[200px] lg:w-3/12 whitespace-nowrap'>Fecha</th>
                    <th className='pb-4 w-[150px] sm:w-[200px] min-w-[150px] sm:min-w-[200px] lg:w-3/12 whitespace-nowrap'>Producto</th>
                    <th className='pb-4 w-[250px] sm:w-[250px] min-w-[150px] sm:min-w-[250px] md:w-[200px] whitespace-nowrap'>Tipo de Movimiento</th>
                    <th className='pb-4 text-center w-[250px] sm:w-[200px] min-w-[150px] sm:min-w-[200px] md:w-[200px] whitespace-nowrap'>Cantidad - Unidades</th>
                    <th className='pb-4 w-[150px] sm:w-[200px] min-w-[150px] sm:min-w-[200px] lg:w-3/12 whitespace-nowrap'>Bodega</th>
                </tr>
              </thead>
              <tbody>
                {movementsFiltered.filter(movement => !movement.isDeleted) 
                  .map((movement) => (
                    <tr key={movement.id} className="border-t hover:bg-slate-50">
                      <td className='py-3'>{movement.user.name}</td>
                      <td className='py-3'>{formatDate(movement.createdAt)}</td>
                      <td className="py-3">{!movement.product?.isDeleted 
                        ? movement.product?.name 
                        : <p className='font-semibold text-gray-400'>{movement.product?.name}</p>}</td>
                      <td className="py-3 first-letter:uppercase">{movement.movement_type}</td>
                      <td className="py-3 text-center">{movement.quantity}</td>
                      <td className="py-3">{!movement.warehouse.isDeleted 
                                            ? movement.warehouse.name 
                                            : <p className='font-semibold text-gray-400'>{movement.warehouse.name}</p>}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex gap-10 py-4 items-center">
            <ButtonCreate
              messageHeader={"No tienes inventario, agrega un stock!"}
              navigatePath="?movimiento=true"
              messageBody={"Crear un movimiento"}
            />
          </div>
        )}

        <Pagination 
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          pages={pages}
          data={movementsInformation}
        />

        <CreateMovement 
            currentPage={currentPage}
        />
    </div>
  )
}

export default DashboardMovements