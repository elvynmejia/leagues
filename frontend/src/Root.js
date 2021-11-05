import React, { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Leagues from './Leagues';

const COLOR_MODE = 'colorMode';
const DARK_MODE = 'dark';
const LIGHT_MODE = 'light';

const Root = () => {
  const [mode, setMode] = useState(
    localStorage?.getItem(COLOR_MODE) || LIGHT_MODE
  );

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const currentMode = prevMode === LIGHT_MODE ? DARK_MODE : LIGHT_MODE;

      localStorage?.setItem(COLOR_MODE, currentMode);

      return currentMode;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          width: '100%',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <ToogleColorMode mode={mode} toggleColorMode={toggleColorMode} />
        <Leagues />
      </Container>
    </ThemeProvider>
  );
};

const ToogleColorMode = ({ toggleColorMode, mode }) => {
  return (
    <p onClick={toggleColorMode} color="inherit" style={{ margin: 0 }}>
      Switch to {mode === LIGHT_MODE ? DARK_MODE : LIGHT_MODE} mode
      <IconButton sx={{ ml: 1 }} color="inherit">
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </p>
  );
};

export default Root;
