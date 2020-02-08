import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import React from "react";
import { AuthReducer } from "./Store/Auth/auth.reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducers = combineReducers({
  auth: AuthReducer
});

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware()));

let persistor = persistStore(store);
export const ReduxStore = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);
