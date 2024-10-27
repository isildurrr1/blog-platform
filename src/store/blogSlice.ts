import { createSlice } from '@reduxjs/toolkit'

import { BlogInitStateType } from '../types/type'

const initialState: BlogInitStateType = {
  list: [],
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
})

export default blogSlice.reducer
