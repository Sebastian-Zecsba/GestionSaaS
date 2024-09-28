import { createSlice } from '@reduxjs/toolkit'
import { genericRequestThunk } from './app.slice'
import axios from '../../utils/axios'

export const categorySlice = createSlice({
  name: 'category',
  initialState: { categories: [] },
  reducers: {
    setCategories: (state, { payload }) => {state.categories = payload},
    addCategory: (state, { payload }) => {state.categories.categories.push(payload)}
  }
})

export const getCategoriesThunk = () => async(dispatch) => {
    dispatch(genericRequestThunk(async () => {
        const res = await axios.get('/categories')
        console.log(res.data)
        dispatch(setCategories(res.data))
    }))
}

export const createCategoryThunk = (category) => async(dispatch) => {
    dispatch(genericRequestThunk(async () => {
        await axios.post('/categories', category)
        dispatch(getCategoriesThunk())
    }))

}


export const { setCategories, addCategory } = categorySlice.actions

export default categorySlice.reducer