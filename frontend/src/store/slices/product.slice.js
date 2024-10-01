import { createSlice } from "@reduxjs/toolkit";
import { genericRequestThunk } from "./app.slice";
import axios from "../../utils/axios";

export const productSlice = createSlice({
  name: "product",
  initialState: { arrayProducts: [], productById: null },
  reducers: {
    setProducts: (state, { payload }) => {
        state.arrayProducts = payload
    },
    setProductById: (state, { payload }) => {state.productById = payload;},
  },
});


export const getProductsThunk = ( url = '/products', searchTerm = '' ) => (dispatch) => {
    dispatch(genericRequestThunk(async () => {
        const query = searchTerm ? `${url}&searchTerm=${searchTerm}` : url
        const res = await axios.get(query)
        dispatch(setProducts(res.data))
    }))
}

export const getProductByIdThunk = ( id ) => (dispatch) => {
  dispatch(genericRequestThunk(async () => {
    const res = await axios.get(`/products/${id}`)
    dispatch(setProductById(res.data))
  }))
}

export const createProductThunk = ( data, currentPage ) => ( dispatch ) => {
  dispatch(genericRequestThunk(async () => {
    await axios.post('/products', data)
    const pageUrl = `/products?page=${currentPage}&limit=10`;
    dispatch(getProductsThunk(pageUrl))
  }))
}

export const deleteProductThunk = ( id, currentPage ) => (dispatch) => {
  dispatch(genericRequestThunk(async () => {
    await axios.delete(`/products/${id}`)
    const pageUrl = `/products?page=${currentPage}&limit=10`;
    dispatch(getProductsThunk(pageUrl))
  }))
}

export const upadateProductByIdThunk = (id, data, currentPage) => (dispatch) => {
  dispatch(genericRequestThunk(async () => {
    await axios.put(`/products/${id}`, data)
    const pageUrl = `/products?page=${currentPage}&limit=10`;
    dispatch(getProductsThunk(pageUrl))
  }))
} 

export const { setProducts, setProductById } = productSlice.actions;

export default productSlice.reducer;