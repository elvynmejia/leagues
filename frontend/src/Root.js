import React, { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import logo from './bmc-full-logo-no-background.png';

import Leagues from './Leagues';

const Root = () => {
  const [mode, setMode] = useState('light');

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            width: '100%',
            bgcolor: 'background.default',
            color: 'text.primary',
          }}
        >
          <ToogleColorMode
            mode={mode}
            toggleColorMode={toggleColorMode}
          />
          <Leagues />
          <Footer mode={mode}/>
        </Container>
      </ThemeProvider>
    </>
  );
};

const ToogleColorMode = ({ toggleColorMode, mode }) => {
  return (
    <p
      onClick={toggleColorMode}
      color="inherit"
      style={{ margin: 0 }}
    >
      switch to {mode === 'dark' ? 'Light' : 'Dark'} mode
    </p>
  );
}

const Footer = ({ mode }) => {
  return (
    <blockquote style={{ textAlign: 'center', margin: 0 }}>
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
  );
}

export default Root;
