import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axios from '../../utils/axios'

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
      navigate('/login')
    } catch (error) {
     toast.error(error.response.data.error) 
    }
}

export const getUserLoggedThunk = () => async(dispatch) => {
    try {
      const res = await axios.get('/auth/get-user')
      dispatch(setUser(res.data));
    } catch (error) {
      toast.error(error.response.data.error)
    }
}

export const loginThunk = (data, navigate) => async (dispatch) => {
  try {
    const { email, password } = data || {};
        
    if (!email || !password) {
        throw new Error("Email o contraseña faltantes");
    }

    const res = await axios.post("/auth/login", { email, password });
    localStorage.setItem('token', res.data.token)
    toast.success('Inicio de sesión correcto');
    navigate('/');
  } catch (error) {
      toast.error(error.response.data.error);
  }
}


export const { setUser  } = userSlice.actions

export default userSlice.reducer