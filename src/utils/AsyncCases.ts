import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit'

import { BlogInitStateType, RegErrorType, FetchRegResType, FetchArtResType } from '../types/type'

const handleAsyncCase = <T, R extends FetchArtResType | FetchRegResType>(
  builder: ActionReducerMapBuilder<BlogInitStateType>,
  actionType: AsyncThunk<R, T, { rejectValue: RegErrorType }>
) => {
  builder
    .addCase(actionType.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      }
    })
    .addCase(actionType.fulfilled, (state, action) => {
      const newState = {
        loading: false,
        error: null,
        list: 'articles' in action.payload ? (action.payload as FetchArtResType).articles : state.list,
        articlesCount:
          'articlesCount' in action.payload ? (action.payload as FetchArtResType).articlesCount : state.articlesCount,
        user: 'user' in action.payload ? (action.payload as FetchRegResType) : state.user,
        loggedIn: 'user' in action.payload ? true : state.loggedIn,
      }
      return {
        ...state,
        ...newState,
      }
    })
    .addCase(actionType.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload || null,
      }
    })
}

export default handleAsyncCase
