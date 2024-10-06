import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

export const movementSlice = createSlice({
    name: "movement",
    initialState: {data: [], movementById: null},
    reducers: {
        setMovement: (state, { payload }) => { state.data = payload}
    },
    setMovementById: (state, { payload }) => { state.movementById = payload}
})

export const getMovementsThunk = (url = "/movements", searchTerm = "") => async (dispatch) => {
    try {
        const query = searchTerm ? `${url}&search=${searchTerm}` : url;
        const res = await axios.get(query)
        dispatch(setMovement(res.data))
    } catch (error) {
        toast.error(error.response.data.error)
    }
}

export const createMovementThunk = (movement, currentPage) => async (dispatch) => {
    try {
        await axios.post(`/movements`, movement)
        const pageUrl = `/movements?page=${currentPage}&limit=10`;
        dispatch(getMovementsThunk(pageUrl))
        toast.success("Movimiento creado exitosamente");
    } catch (error) {
        toast.error(error.response.data.error)
    }
}

export const { setMovement, setMovementById } = movementSlice.actions;

export default movementSlice.reducer;