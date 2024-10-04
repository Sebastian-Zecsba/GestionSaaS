import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: { data: [], inventoryById: null },
  reducers: {
    setInventory: (state, { payload }) => {
      state.data = payload;
    },
    setInventoryById: (state, { payload }) => {
      state.inventoryById = payload;
    },
  },
});

export const getInventoryThunk =
  (url = "/inventories", searchTerm = "") =>
  async (dispatch) => {
    try {
      const query = searchTerm ? `${url}&search=${searchTerm}` : url;
      const res = await axios.get(query);
      dispatch(setInventory(res.data));
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

export const getInventoryByIdThunk = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/inventories/${id}`);
    dispatch(setInventoryById(res.data));
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const createInventoryThunk =
  (inventory, currentPage) => async (dispatch) => {
    try {
      await axios.post("/inventories", inventory);
      const pageUrl = `/inventories?page=${currentPage}&limit=10`;
      dispatch(getInventoryThunk(pageUrl));
      toast.success("Inventario creado exitosamente");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

export const deleteInventoryByIdThunk =
  (id, currentPage) => async (dispatch) => {
    try {
      await axios.delete(`/inventories/${id}`);
      const pageUrl = `/inventories?page=${currentPage}&limit=10`;
      dispatch(getInventoryThunk(pageUrl));
      toast.success("Inventario eliminado exitosamente");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

export const updateInventoryByIdThunk =
  (id, inventory, currentPage) => async (dispatch) => {
    try {
      await axios.put(`/inventories/${id}`, inventory);
      const pageUrl = `/inventories?page=${currentPage}&limit=10`;
      dispatch(getInventoryThunk(pageUrl));
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

export const { setInventory, setInventoryById } = inventorySlice.actions;

export default inventorySlice.reducer;
