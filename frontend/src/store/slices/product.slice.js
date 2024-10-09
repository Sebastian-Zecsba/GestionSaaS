import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

export const productSlice = createSlice({
  name: "product",
  initialState: { data: [], productById: null },
  reducers: {
    setProducts: (state, { payload }) => {
      state.data = payload;
    },
    setProductById: (state, { payload }) => {
      state.productById = payload;
    },
  },
});

export const getProductsThunk =
  (url = "/products", searchTerm = "") =>
  async (dispatch) => {
    try {
      const query = searchTerm ? `${url}&search=${searchTerm}` : url;
      const res = await axios.get(query);
      dispatch(setProducts(res.data));
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

export const getProductByIdThunk = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/products/${id}`);
    dispatch(setProductById(res.data));
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const createProductThunk = (data, currentPage) => async (dispatch) => {
  try {
    await axios.post("/products", data);
    const pageUrl = `/products?page=${currentPage}&limit=10`;
    dispatch(getProductsThunk(pageUrl));
    toast.success("Producto creado exitosamente");
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const deleteProductThunk = (id, currentPage) => async (dispatch) => {
  try {
    await axios.delete(`/products/${id}`);
    const pageUrl = `/products?page=${currentPage}&limit=10`;
    dispatch(getProductsThunk(pageUrl));
    toast.success("Producto eliminado exitosamente");
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const deleteDefinitelyProductById = (id) => async (dispatch) => {
  try {
    await axios.delete(`/products/deleteDefinitely/${id}`);
    dispatch(getProductsThunk());
    toast.success("Producto eliminado exitosamente");
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const restoreProductById = (id) => async (dispatch) => {
  try {
    await axios.put(`/products/restore/${id}`);
    dispatch(getProductsThunk());
    toast.success("Producto restaurado exitosamente");
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const upadateProductByIdThunk =
  (id, data, currentPage) => async (dispatch) => {
    try {
      await axios.put(`/products/${id}`, data);
      const pageUrl = `/products?page=${currentPage}&limit=10`;
      dispatch(getProductsThunk(pageUrl));
      toast.success("Producto actualizado exitosamente");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

export const { setProducts, setProductById } = productSlice.actions;

export default productSlice.reducer;
