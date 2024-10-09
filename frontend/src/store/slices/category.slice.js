import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

export const categorySlice = createSlice({
  name: "category",
  initialState: { data: [], categoryById: null },
  reducers: {
    setCategories: (state, { payload }) => {
      state.data = payload;
    },
    setCategoryById: (state, { payload }) => {
      state.categoryById = payload;
    },
  },
});

export const getCategoriesThunk =
  (url = "/categories", searchTerm = "") =>
  async (dispatch) => {
    try {
      const query = searchTerm ? `${url}&search=${searchTerm}` : url;
      const res = await axios.get(query);
      dispatch(setCategories(res.data));
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

export const getCategoryById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/categories/${id}`);
    dispatch(setCategoryById(res.data));
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const createCategoryThunk =
  (category, currentPage) => async (dispatch) => {
    try {
      await axios.post("/categories", category);
      const pageUrl = `/categories?page=${currentPage}&limit=10`;
      dispatch(getCategoriesThunk(pageUrl));
      toast.success("Categoria creada exitosamente");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

export const deleteCategoryById = (id, currentPage) => async (dispatch) => {
  try {
    await axios.delete(`/categories/${id}`);
    const pageUrl = `/categories?page=${currentPage}&limit=10`;
    dispatch(getCategoriesThunk(pageUrl));
    toast.success("Categoria eliminada exitosamente");
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const deleteDefinitelyCategoryById = (id) => async (dispatch) => {
  try {
    await axios.delete(`/categories/deleteDefinitely/${id}`);
    dispatch(getCategoriesThunk());
    toast.success("Categoria eliminada exitosamente");
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const restoreCategoryById = (id) => async (dispatch) => {
  try {
    await axios.put(`/categories/restore/${id}`);
    dispatch(getCategoriesThunk());
    toast.success("Categoria restaurada exitosamente");
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const upatedCategoryById =
  (info, id, currentPage) => async (dispatch) => {
    try {
      await axios.put(`/categories/${id}`, info);
      const pageUrl = `/categories?page=${currentPage}&limit=10`;
      dispatch(getCategoriesThunk(pageUrl));
      toast.success("Categoria actualizada exitosamente");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

export const { setCategories, setCategoryById } = categorySlice.actions;

export default categorySlice.reducer;
