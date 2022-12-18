import { useState } from 'react';
import { useQuery } from 'react-query';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import Standings from './components/standings';
import Schedule from './components/schedule';
import LeaguesList from './components/leaguesList';

import {
  STANDINGS_HEADERS,
  VALID_SCHEDULE_HEADERS,
  LEAGUES,
  LEAGUES_KEYS,
  CURRENT_SELECTED_LEAGUE
} from './constants';

const getStandingsTableHeaders = () => {
  return STANDINGS_HEADERS.sort(([_a, a], [_b, b]) => {
    return a - b;
  });
};

const getScheduleTableHeaders = () => {
  return VALID_SCHEDULE_HEADERS.sort(([_a, a], [_b, b]) => {
    return a - b;
  });
};

const fetchStats = async (league) => {
  const url = [
    process.env.REACT_APP_API_URL,
    `league_url=${league}`
  ].join('?');

  try {
    const response = await fetch(url);
    return response.json();
  } catch (e) {
    console.log(`Error fetching data from ${url}`);
    console.log({
      e,
    });
    throw e;
  }
};

const App = () => {
  const defaultLeagueUrl = LEAGUES[
    LEAGUES_KEYS[0]
  ];

  const currentLeague = localStorage?.getItem(
    CURRENT_SELECTED_LEAGUE
  ) || defaultLeagueUrl;

  const [selectedLeagueUrl, setSelectedLeague] = useState(
    currentLeague
  );

  const {
    isLoading,
    isError,
    data,
    error
  } = useQuery(selectedLeagueUrl, () => fetchStats(selectedLeagueUrl));

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleLeagueChoice = (e, league) => {
    setSelectedLeague(league);
    localStorage.setItem(CURRENT_SELECTED_LEAGUE, league);
  }

  const { standings, schedule } = data;

  return (
    <>
      <h4>Leagues</h4>
      <LeaguesList
        handleListItemClick={handleLeagueChoice}
        selectedLeagueUrl={selectedLeagueUrl}
      />
      <h4>Standings</h4>
      <TableContainer component={Paper} spacing={3}>
        <Standings headers={getStandingsTableHeaders()} rows={standings} />
      </TableContainer>
      <h4>Schedule</h4>
      <TableContainer component={Paper} spacing={3}>
        <Schedule headers={getScheduleTableHeaders()} rows={schedule} />
      </TableContainer>
    </>
  );
};

export default App;
