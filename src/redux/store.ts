import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { persistStore, persistReducer } from "redux-persist"

// redux and redux-persist config

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
