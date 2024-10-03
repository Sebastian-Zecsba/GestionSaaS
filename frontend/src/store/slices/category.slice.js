import { createSlice } from '@reduxjs/toolkit'
import { genericRequestThunk } from './app.slice'
import axios from '../../utils/axios'


export const categorySlice = createSlice({
  name: 'category',
  initialState: { data: [], categoryById: null },
  reducers: {
    setCategories: (state, { payload }) => {state.data = payload},
    setCategoryById: (state, { payload }) => {state.categoryById = payload}
  }
})

export const getCategoriesThunk = (url = '/categories', searchTerm = '') => (dispatch) => {
    dispatch(genericRequestThunk(async () => {
        const query = searchTerm ? `${url}&search=${searchTerm}` : url
        const res = await axios.get(query)
        dispatch(setCategories(res.data))
    }))
}

export const getCategoryById = (id) => (dispatch) => {
  dispatch(genericRequestThunk(async () => {
      const res = await axios.get(`/categories/${id}`)
      dispatch(setCategoryById(res.data))
  }))
}

export const createCategoryThunk = (category, currentPage) => async(dispatch) => {
      dispatch(genericRequestThunk(async () => {
        await axios.post('/categories', category)
        const pageUrl = `/categories?page=${currentPage}&limit=10`;
        dispatch(getCategoriesThunk(pageUrl))
      }))
}

export const deleteCategoryById = (id, currentPage) => async(dispatch) => {
  dispatch(genericRequestThunk(async () => {
      await axios.delete(`/categories/${id}`)
      const pageUrl = `/categories?page=${currentPage}&limit=10`;
      dispatch(getCategoriesThunk(pageUrl))
  }))
}

export const upatedCategoryById = (info, id, currentPage) => async(dispatch) => {
  dispatch(genericRequestThunk(async () => {
      await axios.put(`/categories/${id}`, info)
      const pageUrl = `/categories?page=${currentPage}&limit=10`;
      dispatch(getCategoriesThunk(pageUrl))
  }))
}


export const { setCategories, setCategoryById } = categorySlice.actions

export default categorySlice.reducer