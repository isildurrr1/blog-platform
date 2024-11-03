import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import ApiService from '../utils/ApiService'
import {
  BlogInitStateType,
  EditFormType,
  FetchArtResType,
  FetchRegResType,
  LoginFormType,
  RegErrorType,
  RegFormType,
} from '../types/type'
import handleAsyncCase from '../utils/AsyncCases'

export const fetchArticles = createAsyncThunk<FetchArtResType, number, { rejectValue: RegErrorType }>(
  'blog/fetchArticles',
  async (page, { rejectWithValue }) => {
    try {
      return await ApiService.getArticles(page)
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(JSON.parse(error.message))
      }
      return rejectWithValue({ errors: { general: 'Unknown error occurred' } })
    }
  }
)

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

export const fetchEditProfile = createAsyncThunk<FetchRegResType, EditFormType, { rejectValue: RegErrorType }>(
  'blog/fetchEditProfile',
  async (user, { rejectWithValue }) => {
    try {
      return await ApiService.updateUserInfo(user)
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
  articlesCount: 0,
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
    handleAsyncCase<number, FetchArtResType>(builder, fetchArticles)
    handleAsyncCase<RegFormType, FetchRegResType>(builder, fetchRegistration)
    handleAsyncCase<string, FetchRegResType>(builder, fetchGetUserInfo)
    handleAsyncCase<LoginFormType, FetchRegResType>(builder, fetchLogin)
    handleAsyncCase<EditFormType, FetchRegResType>(builder, fetchEditProfile)
  },
})

export const { logOut } = blogSlice.actions

export default blogSlice.reducer
