import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const customCellStyles = ({ color = 'error.main', key = '', ...rest } = {}) => {
  const validCells = ['PTS', 'Time/Status', 'Date'];

  return validCells.includes(key) ? { color: 'error.main', ...rest } : {};
};

const Schedule = ({ headers, rows = [] }: { headers: any[], rows: any}) => {
  const headerKeys = headers.map((a: any): string[] => {
    return a[0];
  });

  const dataRows = rows.map((row: any) => {
    return headerKeys.reduce((accumulator, current) => {
      const key = current.toString();
      return {
        ...accumulator,
        [key]: row[key]
      };
    }, {} as Record<string, string>);
  });

  const [date, status, ...rest] = headerKeys;

  const getStatus = (st: string) => {
    switch (st) {
      case 'Complete':
        return <Chip label="completed" color="success" variant="outlined" />;
      case 'Result Pending':
        return <Chip label="pending" color="primary" variant="outlined" />;
      default:
        return <p>{st}</p>;
    }
  };

  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell
            key={`${date}-${status}`}
            style={{
              textAlign: 'left',
            }}
            sx={{...customCellStyles({ key: date.toString() })}}
          >
            Date/Status
          </TableCell>

          {rest.map((cur: any) => {
            return (
              <TableCell
                key={cur}
                style={{
                  textAlign: 'left',
                }}
                sx={{...customCellStyles({ key: cur })}}
              >
                {cur}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {dataRows.map((row: any, idx: number) => {
          const [firstCol, secondCol, ...rest] = Object.keys(row);
          return (
            <TableRow key={`row-${idx}`}>
              <TableCell
                key={`${firstCol}-${secondCol}`}
                style={{
                  textAlign: 'left',
                }}
                sx={{...customCellStyles({ key: firstCol })}}
              >
                <Stack spacing={1} alignItems="center">
                  <Stack direction="column" spacing={1}>
                    <p>{row[firstCol]}</p>
                    {getStatus(row[secondCol])}
                  </Stack>
                </Stack>
              </TableCell>

              {rest.map((key) => {
                return (
                  <TableCell
                    key={key}
                    style={{
                      textAlign: 'left',
                    }}
                    sx={{...customCellStyles({ key })}}
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
  );
};

export default Schedule;
