import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import ApiService from '../utils/ApiService'
import {
  BlogInitStateType,
  FetchArtResType,
  FetchRegResType,
  LoginFormType,
  RegErrorType,
  RegFormType,
} from '../types/type'

export const fetchArticles = createAsyncThunk<FetchArtResType, number>('blog/fetchArticles', async (page) => {
  return ApiService.getArticles(page)
})

export const fetchRegistration = createAsyncThunk<FetchRegResType, RegFormType, { rejectValue: RegErrorType }>(
  'blog/fetchRegistration',
  async (user, { rejectWithValue }) => {
    try {
      return await ApiService.registration(user)
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(JSON.parse(error.message))
      }
      return rejectWithValue({ errors: { general: 'Unknown error occurred' } })
    }
  }
)

export const fetchGetUserInfo = createAsyncThunk<FetchRegResType, string, { rejectValue: RegErrorType }>(
  'blog/fetchGetUserInfo',
  async (token, { rejectWithValue }) => {
    try {
      return await ApiService.getUserInfo(token)
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(JSON.parse(error.message))
      }
      return rejectWithValue({ errors: { general: 'Unknown error occurred' } })
    }
  }
)

export const fetchLogin = createAsyncThunk<FetchRegResType, LoginFormType, { rejectValue: RegErrorType }>(
  'blog/fetchLogin',
  async (user, { rejectWithValue }) => {
    try {
      return await ApiService.login(user)
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(JSON.parse(error.message))
      }
      return rejectWithValue({ errors: { general: 'Unknown error occurred' } })
    }
  }
)

const initialState: BlogInitStateType = {
  list: [],
  loading: false,
  error: null,
  loggedIn: true,
  user: null,
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    logOut(state) {
      state.loggedIn = false
      state.user = null
      localStorage.removeItem('jwt')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.error = null
        state.list = action.payload.articles
        state.loading = false
      })
      .addCase(fetchRegistration.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.error = null
        state.user = action.payload
        state.loading = false
        state.loggedIn = true
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.error = action.payload || null
        state.loading = false
      })
      .addCase(fetchGetUserInfo.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchGetUserInfo.fulfilled, (state, action) => {
        state.error = null
        state.user = action.payload
        state.loading = false
        state.loggedIn = true
      })
      .addCase(fetchGetUserInfo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || null
        state.loggedIn = false
      })
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.error = null
        state.user = action.payload
        state.loading = false
        state.loggedIn = true
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.error = action.payload || null
        state.loading = false
      })
  },
})

export const { logOut } = blogSlice.actions

export default blogSlice.reducer
