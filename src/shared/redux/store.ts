import { configureStore } from '@reduxjs/toolkit'
// import productReducer from './reducers/ProductReducer'
import { api } from './services/api'
import userReducer from './reducers/UserReducer'

export const store = configureStore({
  reducer: {
    // products: productReducer,
    // Add the generated reducer as a specific top-level slice
    [api.reducerPath]: api.reducer,
    user: userReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
