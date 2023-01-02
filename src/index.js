import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import { asyncGetGlobalArticles } from './actions/articleActions';
import { asyncGetUser } from './actions/loginActions';
import App from './components/app';
import store from './store/store';

const token = localStorage.getItem('token');
if (token) {
  store.dispatch(asyncGetUser(token));
  store.dispatch(asyncGetGlobalArticles());
}
if (!token) {
  store.dispatch(asyncGetGlobalArticles());
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
