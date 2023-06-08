import { useState } from 'react';
import { useQuery } from 'react-query';

import ReactGA from 'react-ga';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import Standings from './components/standings';
import Schedule from './components/schedule';
import LeaguesList from './components/leaguesList';

import Chat from './components/chat';
import LeagueList from './components/leaguesList';

import {
  STANDINGS_HEADERS,
  VALID_SCHEDULE_HEADERS,
  LEAGUES,
  LEAGUES_KEYS,
  CURRENT_SELECTED_LEAGUE
} from './constants';

const CHAT_ON = 'CHAT_ON';

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

  const [chatOn, setChatMode] = useState(
    localStorage?.getItem(CHAT_ON) || false
  );

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
    e.preventDefault();
    setSelectedLeague(league);
    localStorage.setItem(CURRENT_SELECTED_LEAGUE, league);
  }

  const toggleChat = (e) => {
    e.preventDefault();
    setChatMode((prevMode) => {
      const currentChatMode = !prevMode;

      ReactGA.event({
        category: 'User',
        action: `chat mode ${currentChatMode}`
      });

      localStorage?.setItem(CHAT_ON, currentChatMode);

      return currentChatMode;
    });
  }

  const { standings, schedule } = data;

  const initialPrompt = [
    <>
      <h6>Choose a league you are interested in</h6>
      <LeagueList
        handleListItemClick={handleLeagueChoice}
        selectedLeagueUrl={selectedLeagueUrl}
      />
    </>
  ];
  
  return (
    <>
      <ChatOption 
        chatOn={chatOn} 
        toggleChat={toggleChat}
      />
      {!chatOn ? (
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
      ) : (
        <>
          <p>selected {selectedLeagueUrl }</p>
          <Chat
          initialState={initialPrompt}
        />
        </>
      )}

    </>
  );
};

const ChatOption = ({ chatOn, toggleChat }) => {
  return (
    <p onClick={toggleChat} color="inherit" style={{ margin: 0 }}>
      {/* Switch to {chatOn === LIGHT_MODE ? DARK_MODE : LIGHT_MODE} mode
      <IconButton sx={{ ml: 1 }} color="inherit">
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton> */}
      { chatOn === true ? 'Chat on' : 'Chat off' }
    </p>
  );
};


export default App;
