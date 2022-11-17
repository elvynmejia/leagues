import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { VALID_STANDINGS_HEADERS } from '../constants';

const customCellStyles = ({ color = 'error.main', key, ...rest } = {}) => {
  const validCells = ['PTS', 'Time/Status', 'Date'];

  return validCells.includes(key) ? { color: 'error.main', ...rest } : {};
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
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          {headerKeys.map((key) => {
            return (
              <TableCell
                key={key}
                style={{
                  textAlign: 'left',
                }}
                sx={{...customCellStyles({ key })}}
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
                  }}
                  sx={{...customCellStyles({ key })}}
                >
                  {row[key]}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Standings;
