import { createSlice } from '@reduxjs/toolkit'
import { genericRequestThunk } from './app.slice'
import axios from '../../utils/axios'

export const categorySlice = createSlice({
  name: 'category',
  initialState: { categories: [], categoryById: null },
  reducers: {
    setCategories: (state, { payload }) => {state.categories = payload},
    setCategoryById: (state, { payload }) => {state.categoryById = payload}
  }
})

export const getCategoriesThunk = (url = '/categories?page=1&limit=10') => async(dispatch) => {
    dispatch(genericRequestThunk(async () => {
        const res = await axios.get(url)
        dispatch(setCategories(res.data))
    }))
}

export const getCategoryById = (id) => (dispatch) => {
  dispatch(genericRequestThunk(async () => {
      const res = await axios.get(`/categories/${id}`)
      dispatch(setCategoryById(res.data))
  }))
}

export const createCategoryThunk = (category) => async(dispatch) => {
    dispatch(genericRequestThunk(async () => {
        await axios.post('/categories', category)
        dispatch(getCategoriesThunk())
    }))
}

export const deleteCategoryById = (id) => async(dispatch) => {
  dispatch(genericRequestThunk(async () => {
      await axios.delete(`/categories/${id}`)
      dispatch(getCategoriesThunk())
  }))
}

export const upatedCategoryById = (info, id) => async(dispatch) => {
  dispatch(genericRequestThunk(async () => {
    await axios.put(`/categories/${id}`, info)
    dispatch(getCategoriesThunk())
  }))
}


export const { setCategories, setCategoryById } = categorySlice.actions

export default categorySlice.reducer