// store/store.ts
import { configureStore,combineReducers } from "@reduxjs/toolkit";
//import the ConterSlice from Slices folder
import SchemeSlice from "./slices/SchemeSlice";
//configure your store
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
//create a persistConfig with a key version storage
const persistConfig = {
  key:"root",
  version:1,
  storage
}

const reducer = combineReducers({
  scheme:SchemeSlice

})
const persistedReducer = persistReducer(persistConfig,reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:false
    })
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store