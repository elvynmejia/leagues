import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import './index.css';
import logo from './bmc-full-logo-no-background.png';

import Root from './Root';

import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Root />
      <blockquote style={{ textAlign: 'center', marginTop: 10 }}>
        <a
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
          href="https://www.buymeacoffee.com/elvynmejia"
        >
          Made with <span style={{ color: '#e25555' }}>&hearts;</span> by
          Elvyn
          <br />
          <img
            style={{ width: 'auto', height: '20px' }}
            src={logo}
            alt="Buy me a coffee"
          />
        </a>
      </blockquote>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
