import { createSlice } from '@reduxjs/toolkit'
import type { User } from '../../../types'

export interface UserState {
  info?: User | null
}

const initialState: UserState = {}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginIsSuccessful: (state, action: any) => {
      return {
        ...state,
        info: {
          ...state.info,
          email: action?.payload?.data?.user?.email || undefined,
          id: action?.payload?.data?.user?.id || undefined,
        },
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginIsSuccessful } = userSlice.actions

export default userSlice.reducer
