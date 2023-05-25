import { configureStore, createSlice } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { uiReducer } from "./ui-slice";
import { messageReducer } from "./message";
import { ratioReducer } from "./ratio";
import { statisticsReducer } from "./statistics";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

// import authReducer from "./auth";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  auth: authReducer,
  uiSlice:uiReducer,
  message: messageReducer,
  ratio: ratioReducer,
  statistics: statisticsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
