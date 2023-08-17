import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { VALID_STANDINGS_HEADERS } from '../constants';

const customCellStyles = ({ color = 'error.main', key = '', ...rest } = {}) => {
  const validCells = ['PTS', 'Time/Status', 'Date'];

  return validCells.includes(key) ? { color: 'error.main', ...rest } : {};
};

const Standings = ({ headers, rows }: { headers: any[], rows: any}) => {
  
  const headerKeys = headers.map((a: any) => a[0]);

  const dataRows = rows.map((row: any) => {
    return headerKeys.reduce((accumulator: Record<string, string>, current: any) => {
      const key = current as string;
      return {
        ...accumulator,
        [key]: row[key],
      };
    }, {});
  });
  
  const sortedByPoints = dataRows.sort((a: any, b: any) => {
    return parseInt(b['PTS']) - parseInt(a['PTS'])
  });

  console.log({sortedByPoints});

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
        {sortedByPoints.map((row: Record<string, string>, idx: number) => {
          return (
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
          )
        })}
      </TableBody>
    </Table>
  );
};

export default Standings;
