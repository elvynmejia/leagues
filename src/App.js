import { useEffect, useState } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import logo from './logo.svg';
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
  return key === 'PTS' ? { color }: {};
}

const App = () => {
  const [stats, setStats] = useState([]);

  useEffect(async () => {
    const { statistics } = await fetchStats();
    setStats(statistics);
  }, []);

  const columns = [
    ...Object.keys(stats[0] || {}).map((key, index) => {

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
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(({ fieldName, headerName }, index) => {
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
          {stats.map((row, idx) => (
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
    </TableContainer>
  );
}

export default App;
