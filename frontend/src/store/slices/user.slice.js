import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (_, { payload }) => payload
  },
})

export const createUserThunk = (user, navigate) => async (dispatch) => {
    try {
      await axios.post('/auth/register', user)
      navigate()
    } catch (error) {
     toast.error(error.response.data.error) 
    }
}

export const getLoggedUserThunk = () => async (dispatch) => {
    try {
      const res = await axios().get("/auth/login")
      dispatch(setUser(res.data));
    } catch (error) {
      toast.error(error.response.data.error)
    }
  
}

export const { setUser  } = userSlice.actions

export default userSlice.reducer