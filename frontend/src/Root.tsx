import { useState } from 'react';
import ReactGA from 'react-ga';

import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Leagues from './Leagues';
import useAnalytics from './Analytics';
import { COLOR_MODE, DARK_MODE, LIGHT_MODE } from './constants';
import { PaletteMode } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    custom: Palette['primary'];
  }

  interface PaletteOptions {
    custom?: PaletteOptions['primary'];
  }
}

const Root = () => {
  useAnalytics();

  const [mode, setMode] = useState(
    (localStorage?.getItem(COLOR_MODE) || LIGHT_MODE)
  );

  const theme = createTheme({
    palette: {
      mode: mode as PaletteMode
    },
  });

  const toggleColorMode = () => {

    setMode((prevMode: any) => {
      const currentMode = prevMode === LIGHT_MODE ? DARK_MODE : LIGHT_MODE;

      ReactGA.event({
        category: 'User',
        action: `Color mode ${currentMode}`
      });

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
        <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
        <Leagues />
      </Container>
    </ThemeProvider>
  );
};

const ToggleColorMode = ({ toggleColorMode, mode }: { toggleColorMode: () => void, mode: any }) => {
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
