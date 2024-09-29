import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryById, getCategoriesThunk } from "../../store/slices/category.slice";
import { useNavigate } from "react-router-dom"
import EditCategory from "./EditCategory";


const DashboardCategory = ({searchTerm}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const categoryInformation = useSelector((state) => state.category);

  const [currentPage, setCurrentPage] = useState(1);

  const fetchCategories = useCallback((pageUrl) => {
    dispatch(getCategoriesThunk(pageUrl));
  }, [dispatch]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleNextPage = () => {
    if (categoryInformation.categories.next) {
      fetchCategories(categoryInformation.categories.next);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (categoryInformation.categories.prev) {
      fetchCategories(categoryInformation.categories.prev);
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredCategories = categoryInformation.categories.categories?.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pages = Math.ceil(categoryInformation.categories.total / categoryInformation.categories.limit)

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Lista de categorías</h2>

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
            {filteredCategories.map((category, index) => (
              <tr key={category.id} className="border-t">
                <td className="py-4 font-semibold">{category.name}</td>
                <td className="py-4">{category.description}</td>
                <td className="py-4">
                  <button
                    onClick={() => navigate(`?editCategory=${category.id}`)}
                    className="mr-3 text-blue-500 hover:text-blue-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => dispatch(deleteCategoryById(category.id))}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No categories available</div>
      )}

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={!categoryInformation.categories.prev}
          className={`p-2 rounded bg-blue-500 text-white hover:bg-blue-700 ${ !categoryInformation.categories.prev ? "opacity-50 cursor-not-allowed" : "" }`}
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

      <EditCategory />
    </div>
  );
};

export default DashboardCategory;