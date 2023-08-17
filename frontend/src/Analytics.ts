import { useState, useEffect } from 'react';

import ReactGA from 'react-ga';

const useAnalytics = () => {
  const location = window.location.pathname;
  const [initialized, setInitialized] = useState(false);

  const { REACT_APP_GOOGLE_GA } = process.env;

  useEffect(() => {
    ReactGA.initialize(REACT_APP_GOOGLE_GA || '');
    setInitialized(true);
  }, [REACT_APP_GOOGLE_GA]);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(window.location.pathname);
    }
  }, [initialized, location]);
};

export default useAnalytics;
