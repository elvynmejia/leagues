import { useQuery } from 'react-query';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const VALID_STANDINGS_HEADERS = {
  Team: 'Team',
  GP: 'Games Played',
  W: 'Wins',
  L: 'Loses',
  T: 'Ties',
  GF: 'Goals for',
  GA: 'Goals Against',
  PTS: 'Points',
  GD: 'Goal Difference',
  WP: 'Winning Percentage',
};

// [header, priority]
const STANDINGS_HEADERS = [
  ['Team',0],
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

const fetchStats = async () => {
  try {
    const response = await fetch(process.env.REACT_APP_API_URL);

    return response.json();
  } catch (e) {
    throw e
  }
};

const customCellStyles = ({ color = 'red', key, ...rest } = {}) => {
  const validCells = ['PTS', 'Time/Status', 'Date'];

  return validCells.includes(key) ? { color: color, ...rest } : {};
};

const App = () => {
  const { isLoading, isError, data, error } = useQuery('sff-data', fetchStats);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const { standings, schedule } = data;

  return (
    <>
      <TableContainer component={Paper} spacing={3}>
        <Standings headers={getStandingsTableHeaders()} rows={standings} />
      </TableContainer>
      <TableContainer component={Paper} spacing={3}>
        <Schedule headers={getScheduleTableHeaders()} rows={schedule} />
      </TableContainer>
    </>
  );
};

const Standings = ({ headers, rows }) => {
  const headerKeys = headers.map(([a]) => a);
  const dataRows = rows.map((row) => {
    return headerKeys.reduce((accumulator, current) => {
      return {
        ...accumulator,
        [current]: row[current],
      };
    }, {});
  });


  return (
    <>
      <h4>Standings</h4>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {headerKeys.map((key) => {
              return (
                <TableCell
                  key={key}
                  style={{
                    textAlign: 'left',
                    ...customCellStyles({ key }),
                  }}
                >
                  {VALID_STANDINGS_HEADERS[key]}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataRows.map((row, idx) => (
            <TableRow key={`row-${idx}`}>
              {Object.keys(row).map((key) => {
                return (
                  <TableCell
                    key={key}
                    style={{
                      textAlign: 'left',
                      ...customCellStyles({ key }),
                    }}
                  >
                    {row[key]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

const Schedule = ({ headers, rows = [] }) => {
  const headerKeys = headers.map(([a]) => a);

  const dataRows = rows.map((row) => {
    return headerKeys.reduce((accumulator, current) => {
      return {
        ...accumulator,
        [current]: row[current],
      };
    }, {});
  });

  const [date, status, ...rest] = headerKeys;

  return (
    <>
      <h4>Schedule</h4>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              key={`${date}-${status}`}
              style={{
                textAlign: 'left',
                ...customCellStyles({ key: date }),
              }}
            >
              Date/Status
            </TableCell>

            {rest.map((cur) => {
              return (
                <TableCell
                  key={cur}
                  style={{
                    textAlign: 'left',
                    ...customCellStyles({ key: cur }),
                  }}
                >
                  {cur}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataRows.map((row, idx) => {
            const [firstCol, secondCol, ...rest] = Object.keys(row);
            return (
              <TableRow key={`row-${idx}`}>
                <TableCell
                  key={`${firstCol}-${secondCol}`}
                  style={{
                    textAlign: 'left',
                    ...customCellStyles({ key: firstCol }),
                  }}
                >
                  <Stack spacing={1} alignItems="center">
                    <Stack direction="column" spacing={1}>
                      <Chip
                        label={row[firstCol]}
                        color="primary"
                        variant="outlined"
                      />
                      {row[secondCol].toLowerCase() === 'complete' ? (
                        <Chip
                          label="completed"
                          color="success"
                          variant="outlined"
                        />
                      ) : (
                        <Chip
                          label={row[secondCol]}
                          color="primary"
                          variant="outlined"
                        />
                      )}
                    </Stack>
                  </Stack>
                </TableCell>

                {rest.map((key) => {
                  return (
                    <TableCell
                      key={key}
                      style={{
                        textAlign: 'left',
                        ...customCellStyles({ key }),
                      }}
                    >
                      {row[key] || 'N/A'}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default App;
