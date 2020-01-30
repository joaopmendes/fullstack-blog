import {createStore} from "redux";
import {Provider} from "react-redux";
import React from "react";


const store = createStore(() => {});
export const ReduxStore = ({children}) => <Provider store={store}>
    {children}
</Provider>;