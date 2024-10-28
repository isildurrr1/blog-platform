import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { BlogInitStateType, FetchArticlesResponseType } from '../types/type'

export const fetchArticles = createAsyncThunk<FetchArticlesResponseType>('blog/fetchArticles', async () => {
  const response = await fetch('https://blog-platform.kata.academy/api/articles')
  const articles = await response.json()
  return articles
})

const initialState: BlogInitStateType = {
  list: [],
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.list = action.payload.articles
    })
  },
})

export default blogSlice.reducer
