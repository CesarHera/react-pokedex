import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { HashRouter } from 'react-router-dom';
import Helmet from 'react-helmet';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Helmet>
      <style>{"body { background-color: rgb(190, 50, 50); }"}</style>
    </Helmet>
    <App />
  </HashRouter>
);