import { createSlice } from '@reduxjs/toolkit'
import { genericRequestThunk } from './app.slice'
import axios from '../../utils/axios'

export const inventorySlice = createSlice({
    name: "inventory",
    initialState: {data: [], inventoryById: null},
    reducers: {
        setInventory: (state, {payload}) => { state.data = payload },
        setInventoryById: (state, {payload}) => { state.inventoryById = payload }
    }
})

export const getInventoryThunk = (url = '/inventories', searchTerm = '') => (dispatch) => {
    dispatch(genericRequestThunk(async () => {
        const query = searchTerm ? `${url}&search=${searchTerm}` : url
        const res = await axios.get(query)
        console.log(res.data.inventories)
        dispatch(setInventory(res.data))
    }))
}

export const getInventoryByIdThunk = (id) => (dispatch) => {
    dispatch(genericRequestThunk(async () => {
        const res = await axios.get(`/inventories/${id}`)
        dispatch(setInventoryById(res.data))
    }))
}

export const createInventoryThunk = (inventory, currentPage) => (dispatch) => {
    dispatch(genericRequestThunk(async () => {
        await axios.post('/inventories', inventory)
        const pageUrl = `/inventories?page=${currentPage}&limit=10`;
        dispatch(getInventoryThunk(pageUrl))
    }))
}

export const deleteInventoryByIdThunk = (id, currentPage) => (dispatch) => {
    dispatch(genericRequestThunk(async () => {
        await axios.delete(`/inventories/${id}`)
        const pageUrl = `/inventories?page=${currentPage}&limit=10`;
        dispatch(getInventoryThunk(pageUrl))
    }))
}

export const updateInventoryByIdThunk = (id, inventory, currentPage) => (dispatch) => {
    dispatch(genericRequestThunk(async () => {
        await axios.put(`/inventories/${id}`, inventory)
        const pageUrl = `/inventories?page=${currentPage}&limit=10`;
        dispatch(getInventoryThunk(pageUrl))
    }))
}

export const { setInventory, setInventoryById } = inventorySlice.actions

export default inventorySlice.reducer