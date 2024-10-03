import { createSlice } from "@reduxjs/toolkit";
import { genericRequestThunk } from "./app.slice";
import axios from "../../utils/axios";

export const warehouseSlice = createSlice({
    name: "warehouse",
    initialState: { data: [], warehouseById: null },
    reducers: {
        setWarehouses: (state, { payload }) => {
            state.data = payload;
        },
        setWarehouseById: (state, { payload }) => {
            state.warehouseById = payload;
        },
    }
})

export const getWarehousesThunk = (url = '/warehouses', searchTerm = '') => (dispatch) => {
    dispatch(genericRequestThunk(async () => {
        const query = searchTerm ? `${url}&search=${searchTerm}` : url
        const res = await axios.get(query)
        dispatch(setWarehouses(res.data))
    }))
}

export const getWarehouseById = (id) => (dispatch) => {
  dispatch(genericRequestThunk(async () => {
      const res = await axios.get(`/warehouses/${id}`)
      dispatch(setWarehouseById(res.data))
  }))
}

export const createWarehouseThunk = (warehouse, currentPage) => async(dispatch) => {
      dispatch(genericRequestThunk(async () => {
        await axios.post('/warehouses', warehouse)
        const pageUrl = `/warehouses?page=${currentPage}&limit=10`;
        dispatch(getWarehousesThunk(pageUrl))
      }))
}

export const deleteWarehouseById = (id, currentPage) => async(dispatch) => {
  dispatch(genericRequestThunk(async () => {
      await axios.delete(`/warehouses/${id}`)
      const pageUrl = `/warehouses?page=${currentPage}&limit=10`;
      dispatch(getWarehousesThunk(pageUrl))
  }))
}

export const upadateWarehouseByIdThunk = (id, data, currentPage) => (dispatch) => {
  dispatch(genericRequestThunk(async () => {
      await axios.put(`/warehouses/${id}`, data)
      const pageUrl = `/warehouses?page=${currentPage}&limit=10`;
      dispatch(getWarehousesThunk(pageUrl))
  }))
}

export const { setWarehouseById, setWarehouses } = warehouseSlice.actions

export default warehouseSlice.reducer