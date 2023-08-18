const VALID_STANDINGS_HEADERS = [
  'GP',
  'W',
  'L',
  'T',
  'GF',
  'GA',
  'PTS',
  'GD',
  'WP',
];
  
const VALID_SCHEDULE_HEADERS = [
  'Date',
  'Home',
  '',
  'Away',
  'Time/Status',
  'Venue',
  'Game Type',
  'Officials',
];
  
const INVALID_HEADERS = ['', 'Calendar Sync', 'Get CalendarCopy Sync URL'];
  
export { VALID_STANDINGS_HEADERS, VALID_SCHEDULE_HEADERS, INVALID_HEADERS };