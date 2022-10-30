import { configureStore } from '@reduxjs/toolkit'
// import productReducer from './reducers/ProductReducer'
import { api } from './services/api'

export const store = configureStore({
  reducer: {
    // products: productReducer,
    // Add the generated reducer as a specific top-level slice
    [api.reducerPath]: api.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
