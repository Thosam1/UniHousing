import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../features/store'

// Define a type for the slice state
interface authState {
  value: boolean
//   userToken: string | null
}

// const userToken = null; // localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

// Define the initial state using that type
const initialState: authState = {
  value: false,
//   userToken,
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loginRDK: (state) => {
      state.value = true;
    },
    logoutRDK: (state) => {
      state.value = false;
    },
  },
})

export const { loginRDK, logoutRDK } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuthStatus = (state: RootState) => state.auth.value

export default authSlice.reducer