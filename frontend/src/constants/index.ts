const VALID_STANDINGS_HEADERS: { [key: string]: string } = {
  'Team': 'Team',
  'GP': 'Games Played',
  'W': 'Wins',
  'L': 'Loses',
  'T': 'Ties',
  'GF': 'Goals for',
  'GA': 'Goals Against',
  'PTS': 'Points',
  'GD': 'Goal Difference',
  'WP': 'Winning Percentage',
};

// [header, priority]
const STANDINGS_HEADERS = [
  ['Team', 0],
  ['PTS', 1],
  ['W', 2],
  ['L', 3],
  ['T', 4],
  ['GF', 5],
  ['GA', 6],
  ['GP', 7],
  ['GD', 8],
  ['WP', 9],
];

// [header, priority]
const VALID_SCHEDULE_HEADERS = [
  ['Date', 0],
  ['Time/Status', 1],
  ['Home', 2],
  ['', 3],
  ['Away', 4],
  ['Venue', 5],
  ['Game Type', 6],
  ['Officials', 7],
];

const COLOR_MODE = 'colorMode';
const DARK_MODE = 'dark';
const LIGHT_MODE = 'light';

const CURRENT_SELECTED_LEAGUE = 'currentSelectedLeague';

export {
  VALID_STANDINGS_HEADERS,
  STANDINGS_HEADERS,
  VALID_SCHEDULE_HEADERS,
  COLOR_MODE,
  DARK_MODE,
  LIGHT_MODE,
  CURRENT_SELECTED_LEAGUE
}
