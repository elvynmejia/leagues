import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import Standings from './components/standings';
import Schedule from './components/schedule';
import LeaguesList from './components/leaguesList';

import useGetLeagues from './hooks/useGetLeagues';

import {
  STANDINGS_HEADERS,
  VALID_SCHEDULE_HEADERS,
  CURRENT_SELECTED_LEAGUE,
} from './constants';

const sortable = (a: any[], b: any[]) => {
  return a[1] - b[1];
};

const getStandingsTableHeaders = () => {
  return STANDINGS_HEADERS.sort(sortable);
};

const getScheduleTableHeaders = () => {
  return VALID_SCHEDULE_HEADERS.sort(sortable);
};

const fetchStats = async (league: string) => {
  const url = [process.env.REACT_APP_API_URL, `league_url=${league}`].join('?');

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
  const leagues = useGetLeagues();

  const defaultLeagueUrl = leagues?.data?.leagues[0][1];

  const currentLeague =
    localStorage?.getItem(CURRENT_SELECTED_LEAGUE) || defaultLeagueUrl;

  const [selectedLeagueUrl, setSelectedLeague] = useState(currentLeague || '');

  const { isLoading, isError, data, error } = useQuery({
    queryKey: [selectedLeagueUrl],
    queryFn: () => fetchStats(selectedLeagueUrl),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError && error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }

  const handleLeagueChoice = (
    e: React.MouseEvent<HTMLButtonElement>,
    league: string,
  ) => {
    e.preventDefault();
    setSelectedLeague(league);
    localStorage.setItem(CURRENT_SELECTED_LEAGUE, league);
  };

  const { standings, schedule } = data;

  return (
    <>
      <h4>Leagues</h4>
      <LeaguesList
        handleListItemClick={handleLeagueChoice}
        selectedLeagueUrl={selectedLeagueUrl}
      />
      <h4>Standings</h4>
      <TableContainer component={Paper}>
        <Standings headers={getStandingsTableHeaders()} rows={standings} />
      </TableContainer>
      <h4>Schedule</h4>
      <TableContainer component={Paper}>
        <Schedule headers={getScheduleTableHeaders()} rows={schedule} />
      </TableContainer>
    </>
  );
};

export default App;
