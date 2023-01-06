import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../features/store'
import { PrivateProfile } from '../../api/typesAPI';

// Define a type for the slice state
type authState = {
  accessToken: string | null,
  // refreshToken: string | null,
  authenticated: boolean | null,
  user: PrivateProfile;
}

// const userToken = null; // localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

// Define the initial state using that type
const initialState: authState = {
  accessToken: null,
  authenticated: false,
  user: {
    profile_id: '',
    avatar: "assets/images/anonymous-avatar.jpg",
    first_name: '',
    last_name: '',
    email: '',
    status: '',
    bio: '',
  },
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logoutRTK: () => initialState,
    setUserState: (
      state,
      action: PayloadAction<{ authenticated: boolean; accessToken: string }>
    ) => {
      state.authenticated = action.payload.authenticated;
      state.accessToken = action.payload.accessToken;

      // also must fetch user profile
    },
    setUser: (
      state,
      action: PayloadAction<{ user: PrivateProfile }>
    ) => {
      state.user = action.payload.user;
    },
    defaultState: (state) => {
      state = initialState;
    },
  },
})

export const { setUserState, setUser, logoutRTK, defaultState } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuthStatus = (state: RootState) => state.auth.authenticated
export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectUser = (state: RootState) => state.auth.user
export const selectUserID = (state: RootState) => state.auth.user.profile_id

export default authSlice.reducer