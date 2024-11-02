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

const initialState: BlogInitStateType = {
  list: [],
  loading: false,
  error: null,
  success: false,
  user: null,
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearSuccess(state) {
      state.success = false
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
        state.success = true
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.error = action.payload || null
        state.loading = false
      })
  },
})

export const { clearSuccess } = blogSlice.actions

export default blogSlice.reducer
