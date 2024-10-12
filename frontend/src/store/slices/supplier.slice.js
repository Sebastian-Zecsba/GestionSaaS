import { createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
import { toast } from 'react-toastify'

export const supplierSlice = createSlice({
  name: 'supplier',
  initialState: { data: [], supplierById: null },
  reducers: {
    setSuppliers: (state, { payload }) => {
      state.data = payload
    },
    setSupplierById: (state, { payload }) => {
      state.supplierById = payload
    }
  }
})

export const getSuppliersThunk = (url = '/suppliers', searchTerm = '') => async (dispatch) => {
  try {
    const query = searchTerm ? `${url}&search=${searchTerm}` : url
    const res = await axios.get(query)
    dispatch(setSuppliers(res.data))
  } catch (error) {
    toast.error(error.response.data.error)
  }
}

export const getSupplierByIdThunk = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/suppliers/${id}`)
    dispatch(setSupplierById(res.data))
  } catch (error) {
    toast.error(error.response.data.error)
  }
}

export const createSupplierThunk = (data, currentPage) => async (dispatch) => {
  try {
    await axios.post('/suppliers', data)
    const pageUrl = `/suppliers?page=${currentPage}&limit=10`
    dispatch(getSuppliersThunk(pageUrl))
    toast.success('Proveedor creado exitosamente')
  } catch (error) {
    toast.error(error.response.data.error)
  }
}

export const deleteSupplierThunk = (id, currentPage) => async (dispatch) => {
  try {
    await axios.delete(`/suppliers/${id}`)
    const pageUrl = `/suppliers?page=${currentPage}&limit=10`
    dispatch(getSuppliersThunk(pageUrl))
    toast.success('Proveedor eliminado exitosamente')
  } catch (error) {
    toast.error(error.response.data.error)
  }
}

export const deleteDefinitelySupplierById = (id) => async (dispatch) => {
  try {
    await axios.delete(`/suppliers/${id}/definitely`)
    dispatch(getSuppliersThunk())
    toast.success('Proveedor eliminado exitosamente')
  } catch (error) {
    toast.error(error.response.data.error)
  }
}

export const restoreSupplierById = (id) => async (dispatch) => {
  try {
    await axios.post(`/suppliers/${id}/restore`)
    dispatch(getSuppliersThunk())
    toast.success('Proveedor restaurado exitosamente')
  } catch (error) {
    toast.error(error.response.data.error)
  }
}

export const upadateSupplierByIdThunk = (id, data, currentPage) => async (dispatch) => {
  try {
    await axios.put(`/suppliers/${id}`, data)
    const pageUrl = `/suppliers?page=${currentPage}&limit=10`
    dispatch(getSuppliersThunk(pageUrl))
    toast.success('Proveedor actualizado exitosamente')
  } catch (error) {
    toast.error(error.response.data.error)
  }
}


export const { setSuppliers, setSupplierById } = supplierSlice.actions;

export default supplierSlice.reducer;