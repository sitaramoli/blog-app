import {configureStore, combineReducers} from "@reduxjs/toolkit";
import userReducer from "./redux/user/userSlice.ts";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";


export const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);