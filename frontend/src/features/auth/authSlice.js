import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Register new user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (err) {
      const error =
        (err?.response?.data?.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// Login user
export const login = createAsyncThunk(
  'auth/login', 
  async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (err) {
      const error =
        (err?.response?.data?.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// Update user
export const update = createAsyncThunk(
  'auth/update', 
  async (user, thunkAPI) => {
    try {
      return await authService.update(user)
    } catch (err) {
      const error =
        (err?.response?.data?.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// Logout user
export const logout = createAsyncThunk(
  'auth/logout', 
  async () => { await authService.logout() }
)

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  status: 'idle',
  error: null,
  user: user ?? null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(register.pending, (state) => {
      //   state.status = 'loading'
      // })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
        state.user = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
        state.user = null
      })
      .addCase(update.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = {...state.user, ...action.payload}
      })
      .addCase(update.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
