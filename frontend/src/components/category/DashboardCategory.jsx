import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesThunk } from "../../store/slices/category.slice";

const DashboardCategory = () => {
  const dispatch = useDispatch();
  const categoryInformation = useSelector((state) => state.category);

  const fetchCategories = useCallback(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div>
      {categoryInformation.categories.categories?.length > 0 ? (
        categoryInformation.categories.categories.map((category) => (
          <div key={category.id}>
            <h1>{category.name}</h1>
            <p>{category.description}</p>
            <button onClick={() => console.log(category.id)}>
                asdasd
            </button>
          </div>
        ))
      ) : (
        <div>No categories available</div>
      )}
    </div>
  );
};

export default DashboardCategory;
