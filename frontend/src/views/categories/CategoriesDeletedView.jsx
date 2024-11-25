import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDefinitelyCategoryById, getCategoriesThunk, restoreCategoryById } from '../../store/slices/category.slice';
import { toast } from 'react-toastify';

const CategoriesDeletedView = () => {

  const dispatch = useDispatch();
  const categoryInformation = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoriesThunk())
  }, [])

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold mb-6">Lista de categorías</h2>
          {categoryInformation.data.categories?.filter(category => category.isDeleted).length > 0 ?
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left">
                <th className="pb-4 w-3/12">Nombre</th>
                <th className="pb-4 w-3/12">Descripción</th>
                <th className="pb-4 w-2/12">Acciones</th>
              </tr>
            </thead>
          <tbody>
              {categoryInformation.data.categories
                .filter(category => category.isDeleted)
                .map((category) => (
                  <tr key={category.id} className="border-t hover:bg-slate-50">
                    <td className="py-3">{category.name}</td>
                    <td className="py-3">{category.description}</td>
                    <td className="py-3 flex gap-2">
                      <button
                        onClick={() => dispatch(restoreCategoryById(category.id))}
                        className="bg-orange-400 hover:bg-orange-500 text-white px-3 p-1 rounded-[10px]"
                      >
                        Renovar
                      </button>
                      <button
                        onClick={() => dispatch(deleteDefinitelyCategoryById(category.id))}
                        className="bg-red-500 hover:bg-red-700 text-white px-3 p-1 rounded-[10px]" 
                      >
                      Eliminar Definitivamente
                    </button>
                    </td>
                  </tr>
                ))}
            </tbody>
        </table> : 
          <div className="flex gap-10 py-4 items-center">
           <p>No tienes aun nada eliminado</p>
          </div>
        }
      </div>
    </>
  )
}

export default CategoriesDeletedView