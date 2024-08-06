// #region Global Imports
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
// eslint-disable-next-line import/no-extraneous-dependencies
// import logger from "redux-logger";
// #endregion Global Imports

// #region Local Imports
import Reducers from "./Reducers";
// #endregion Local Imports

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["prediction"],
    blacklist: ["home"],
};

const store = configureStore({
    reducer: persistReducer(persistConfig, Reducers),
    middleware: [
        ...getDefaultMiddleware({ thunk: true, serializableCheck: false }),
        // logger,
    ],
    devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export const makeStore = () => {
    return store;
};

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
