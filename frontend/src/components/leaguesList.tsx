import { memo } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import useGetLeagues from '../hooks/useGetLeagues';

const LeaguesList = ({
  handleListItemClick, 
  selectedLeagueUrl
}: { 
  handleListItemClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    selectedLeagueUrl: string
  ) => void,
  selectedLeagueUrl: string
}) => {

  const { data } = useGetLeagues();

  return (
    <List>
      {(data?.leagues || []).map((league: any[]) => {
        const [name, url] = league;
        return (
          <ListItem disablePadding key={league.join('-')}>
            <ListItemButton
              selected={url === selectedLeagueUrl}
              onClick={(event: any) => handleListItemClick(event, url)}
            >
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  );
}

export default memo(LeaguesList);
