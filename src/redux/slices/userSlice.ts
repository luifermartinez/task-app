import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

/* Defining the shape of the user state. */
export interface User {
  name: string
  email: string
}

/* Defining the shape of the user state. */
export interface UserState {
  user: User
  loggedIn: boolean
  token: string
}

/* Defining the type of the payload that is passed to the reducer. */
export interface UserPayload {
  user: User
  token: string
}

/* Defining the initial state of the user. */
const initialState: UserState = {
  user: {
    name: "",
    email: "",
  },
  loggedIn: false,
  token: "",
}

/* Creating a slice of the user state. */
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserPayload>) {
      state.user = action.payload.user
      state.loggedIn = true
      state.token = action.payload.token
    },
    logout(state) {
      state.user = initialState.user
      state.loggedIn = false
    },
  },
})

// ACTIONS
export const { login, logout } = userSlice.actions

// SELECTORS
export const selectUserState = (state: RootState) => state

export default userSlice.reducer
