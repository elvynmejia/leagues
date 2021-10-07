import { useEffect, useState } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

import logo from './logo.svg';
import './App.css';

const fetchStats = async () => {
  try {
    const response = (
        await fetch('http://localhost:3001')
    ).json();

    return response;
  } catch(e) {
    console.warn('Error loading data ...');
    console.error(e);
  }
}

const App = () => {
  const [stats, setStats] = useState([]);

  useEffect(async () => {
    const { statistics } = await fetchStats();
    setStats(statistics)
  }, []);

  const columns = Object.keys(stats[0] || {}).map(key => {
    return {
      field: key,
      headerName: key,
      sortable: false,
      disableColumnMenu: true,
      width: 150
    };
  });

  const rows = stats.reduce((accumulator, current) => {
    return [
      ...accumulator,
      Object.keys(current).reduce((acc, key) => {
        return {
          ...acc,
          id: current.Team,
          [key]: current[key]
        }
      }, {})
    ]
  }, []);

  return (
    <div className="App">
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          hideFooterPagination={true}
          isRowSelectable={() => false}
        />
      </div>
    </div>
  );
}

export default App;
