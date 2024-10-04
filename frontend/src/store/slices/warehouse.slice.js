import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

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
  },
});

export const getWarehousesThunk =
  (url = "/warehouses", searchTerm = "") =>
  async (dispatch) => {
    try {
      const query = searchTerm ? `${url}&search=${searchTerm}` : url;
      const res = await axios.get(query);
      dispatch(setWarehouses(res.data));
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

export const getWarehouseById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/warehouses/${id}`);
    dispatch(setWarehouseById(res.data));
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const createWarehouseThunk =
  (warehouse, currentPage) => async (dispatch) => {
    try {
      await axios.post("/warehouses", warehouse);
      const pageUrl = `/warehouses?page=${currentPage}&limit=10`;
      dispatch(getWarehousesThunk(pageUrl));
      toast.success("Bodega creado exitosamente");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

export const deleteWarehouseById = (id, currentPage) => async (dispatch) => {
  try {
    await axios.delete(`/warehouses/${id}`);
    const pageUrl = `/warehouses?page=${currentPage}&limit=10`;
    dispatch(getWarehousesThunk(pageUrl));
    toast.success("Bodega eliminado exitosamente");
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const upadateWarehouseByIdThunk =
  (id, data, currentPage) => async (dispatch) => {
    try {
      await axios.put(`/warehouses/${id}`, data);
      const pageUrl = `/warehouses?page=${currentPage}&limit=10`;
      dispatch(getWarehousesThunk(pageUrl));
      toast.success("Bodega actualizado exitosamente");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

export const { setWarehouseById, setWarehouses } = warehouseSlice.actions;

export default warehouseSlice.reducer;
