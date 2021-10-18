import { useQuery } from 'react-query'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './App.css';

const HEADERS = {
  Team: 'Team',
  GP: 'Games Played',
  W: 'Wins',
  L: 'Loses',
  T: 'Ties',
  GF: 'Goals for',
  GA: 'Goals Against',
  PTS: 'Points',
  GD: 'Goal Difference',
  WP: 'Winning Percentage'
};

const fetchStats = async () => {
  try {
    const response = (
        await fetch('http://localhost:3001')
    );

    return response.json();
  } catch(e) {
    console.warn('Error loading data ...');
    console.error(e);
  }
}

class UnknownTableHeaderKey extends Error {}

const pointsCellStyles = ({ color = 'red', key }) => {
  return key === 'PTS' || key === 'Time/Status' ? { color }: {};
}

const App = () => {
  const {
    isLoading,
    isError,
    data,
    error
  } = useQuery('sff-data', fetchStats);

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const columns = [
    ...Object.keys(data.standings[0] || {}).map((key, index) => {

      if (!HEADERS[key]) {
        throw new UnknownTableHeaderKey(`Unknown header key: ${key}`)
      }

      return {
        fieldName: key,
        headerName: HEADERS[key],
      };
    })
  ];

  return (
    <>
      <TableContainer component={Paper}>
      <h4>Standings</h4>
        <Standings headers={columns} rows={data.standings} />
      <h4>Schedule</h4>
      <Schedule headers={Object.keys(data.schedule[0] || {})} rows={data.schedule} />
      </TableContainer>
    </>
  );
}

const Standings = ({ headers, rows }) => {
  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          {headers.map(({ fieldName, headerName }, index) => {
            return(
              <TableCell
                key={fieldName}
                style={{
                  textAlign: 'left',
                  ...(pointsCellStyles({ key: fieldName }))
                }}
              >
                {headerName}
              </TableCell>)
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow
            key={`row-${idx}`}
          >
            {Object.keys(row).map(key => {
              return (
                <TableCell
                  key={key}
                  style={{
                    textAlign: 'left',
                    ...(pointsCellStyles({ key }))
                  }}
                >
                  {row[key]}
                </TableCell>
              )
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const Schedule  = ({ headers, rows = []}) => {
  return (
    <>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((cur, index) => {
              return(
                <TableCell
                  key={cur}
                  style={{
                    textAlign: 'left',
                    ...(pointsCellStyles({ key: cur }))
                  }}
                >
                  {cur}
                </TableCell>)
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow
              key={`row-${idx}`}
            >
              {Object.keys(row).map(key => {
                return (
                  <TableCell
                    key={key}
                    style={{
                      textAlign: 'left',
                      ...(pointsCellStyles({ key }))
                    }}
                  >
                    {row[key]}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default App;
