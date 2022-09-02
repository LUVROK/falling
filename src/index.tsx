import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Wallet from './provider/walletProvider';
import './fonts/fonts.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Wallet>
      <App />
    </Wallet>
  </React.StrictMode>
);

reportWebVitals();