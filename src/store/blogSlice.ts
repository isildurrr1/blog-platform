import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  BlogInitStateType,
  FetchArticlesResponseType,
  FetchRegistrationResponseType,
  RegErrorType,
  RegisterFormType,
} from '../types/type'

export const fetchArticles = createAsyncThunk<FetchArticlesResponseType, number>('blog/fetchArticles', async (page) => {
  const response = await fetch(`https://blog-platform.kata.academy/api/articles?limit=5&offset=${(page - 1) * 5}`)
  const articles = await response.json()
  return articles
})

export const fetchRegistration = createAsyncThunk<
  FetchRegistrationResponseType,
  RegisterFormType,
  { rejectValue: RegErrorType }
>('blog/fetchRegistration', async (user, { rejectWithValue }) => {
  const { username, email, password } = user

  try {
    const response = await fetch('https://blog-platform.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { username, email, password } }),
    })

    if (!response.ok) {
      const errorData: RegErrorType = await response.json()
      return rejectWithValue(errorData)
    }

    const newUser: FetchRegistrationResponseType = await response.json()
    localStorage.setItem('jwt', newUser.user.token)
    return newUser
  } catch (error) {
    return rejectWithValue({ errors: { username: 'Network error' } })
  }
})

export const fetchGetUserInfo = createAsyncThunk<FetchRegistrationResponseType, string, { rejectValue: RegErrorType }>(
  'blog/fetchGetUserInfo',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch('https://blog-platform.kata.academy/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user info')
      }

      const info = await response.json()
      localStorage.setItem('jwt', info.user.token)
      return info
    } catch (error) {
      return rejectWithValue({ errors: { general: 'Failed to fetch user info' } })
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
  },
})

export const { logOut } = blogSlice.actions

export default blogSlice.reducer
