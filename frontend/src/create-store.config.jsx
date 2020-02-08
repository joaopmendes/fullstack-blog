import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import PropTypes from 'prop-types';
import { AuthReducer } from './Store/Auth/auth.reducer';

const rootReducers = combineReducers({
  auth: AuthReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware()));

const persistor = persistStore(store);
export const ReduxStore = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);

ReduxStore.propTypes = {
  children: PropTypes.element.isRequired,
};
