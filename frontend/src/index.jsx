import React from 'react';
import ReactDOM from 'react-dom';
import { ReduxStore } from './create-store.config';
import { RouterConfig } from './create-router.config';
import 'normalize.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './main.css';
import { StyledTheme } from './create-theme.style';
import { ToastProvider } from 'react-toast-notifications';

const App = () => (
  <StyledTheme>
    <ReduxStore>
      <ToastProvider autoDismiss autoDismissTimeout={6000}>
        <RouterConfig />
      </ToastProvider>
    </ReduxStore>
  </StyledTheme>
);

ReactDOM.render(<App />, document.getElementById('root'));
