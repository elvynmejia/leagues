import { useState, useEffect } from 'react';

import ReactGA from 'react-ga';

const useAnalytics = () => {
  const location = window.location.pathname;
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_GA);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialized, location]);
};

export default useAnalytics;
