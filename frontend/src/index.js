import React from 'react';
import ReactDOM from 'react-dom';
import {ReduxStore} from "./create-store.config";
import {RouterConfig} from "./create-router.config";
import "normalize.css";
import "./main.css";
import {StyledTheme} from "./create-theme.style";
const App  = () => {
    return (
        <StyledTheme>
            <ReduxStore>
                <RouterConfig />
            </ReduxStore>
        </StyledTheme>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
