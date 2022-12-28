import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../features/store'
import { PrivateProfile } from '../../api/typesAPI';

// Define a type for the slice state
type authState = {
  accessToken: string | null,
  // refreshToken: string | null,
  authenticated: boolean | null,
  user: PrivateProfile | null;
}

// const userToken = null; // localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

// Define the initial state using that type
const initialState: authState = {
  accessToken: null,
  authenticated: false,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logoutRTK: () => initialState,
    setUser: (
      state,
      action: PayloadAction<{ authenticated: boolean; accessToken: string }>
    ) => {
      state.authenticated = action.payload.authenticated;
      state.accessToken = action.payload.accessToken;

      // also must fetch user profile
    },
    defaultState: (state) => {
      state = initialState;
    },
  },
})

export const { setUser, logoutRTK, defaultState } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuthStatus = (state: RootState) => state.auth.authenticated
export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer