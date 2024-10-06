import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryById, getCategoriesThunk } from "../../store/slices/category.slice";
import { useNavigate } from "react-router-dom"
import EditCategory from "./EditCategory";
import CreateCategory from "./CreateCategory";
import Pagination from "../Pagination";
import ButtonCreate from "../ButtonCreate";

const DashboardCategory = ({searchTerm}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const categoryInformation = useSelector((state) => state.category);


  const [currentPage, setCurrentPage] = useState(1);

  const fetchCategories = useCallback((page, searchTerm) => {
    const pageUrl = `/categories?page=${page}&limit=10`;
    dispatch(getCategoriesThunk(pageUrl, searchTerm));
  }, [dispatch]);

  useEffect(() => {
    fetchCategories(currentPage, searchTerm);
  }, [fetchCategories, searchTerm]);

  const handleNextPage = () => {
    if (categoryInformation) {
      fetchCategories(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (categoryInformation) {
      fetchCategories(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredCategories = categoryInformation.data.categories?.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pages = Math.ceil(categoryInformation.data.total / categoryInformation.data.limit)

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold mb-6">Lista de categorías</h2>

      {filteredCategories?.length > 0 ? (
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left">
              <th className="pb-4 w-3/12">Nombre</th>
              <th className="pb-4 w-7/12">Descripción</th>
              <th className="pb-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
              {filteredCategories
                .filter(category => !category.isDeleted)
                .map((category) => (
                  <tr key={category.id} className="border-t hover:bg-slate-50">
                    <td className="py-3">{category.name}</td>
                    <td className="py-3">{category.description}</td>
                    <td className="py-3">
                      <button
                        onClick={() => navigate(`?editCategory=${category.id}`)}
                        className="mr-3 bg-blue-500 hover:bg-blue-700 text-white px-3 p-1 rounded-[10px]"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => dispatch(deleteCategoryById(category.id, currentPage))}
                        className="bg-red-500 hover:bg-red-700 text-white px-3 p-1 rounded-[10px]"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
        </table>
      ) : (
        <div className="flex gap-10 py-4 items-center">
          <ButtonCreate 
            messageHeader={"No has creado alguna categoria, ¡crea una!"}
            navigatePath="?categoria=true"
            messageBody={"+ Agregar Categoria"}
          />
        </div>
      )}

      <Pagination
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
        pages={pages}
        data={categoryInformation}
      />

      <EditCategory 
        currentPage={currentPage}
      />

      <CreateCategory 
        currentPage={currentPage}
      />
    </div>
  );
};

export default DashboardCategory;