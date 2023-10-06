import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContextProvider from './context/user';
import store from './redux/store';

if (process.env.NODE_ENV !== 'dev') disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </Provider>
  </BrowserRouter>,
);
reportWebVitals();
