import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BlogInitStateType {
  list: []
}

const initialState: BlogInitStateType = {
  list: [],
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
})

export default blogSlice.reducer