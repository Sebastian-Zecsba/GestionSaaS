import { createSlice } from '@reduxjs/toolkit'
import { genericRequestThunk } from './app.slice'

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (_, { payload }) => payload
  },
})

export const createUserThunk = (user, navigate) => (dispatch) => {
  dispatch(genericRequestThunk(async () => {
    await axios.post('/auth/register', user)
    navigate()
  }, "User created successfully"))
}

export const getLoggedUserThunk = () => dispatch => {
  dispatch(genericRequestThunk(async () => {
      const res = await axios().get("/auth/login")
      dispatch(setUser(res.data));
  }))
}

export const { setUser  } = userSlice.actions

export default userSlice.reducer