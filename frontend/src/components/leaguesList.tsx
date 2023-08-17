import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { LEAGUES_KEYS, LEAGUES } from '../constants';

const LeaguesList = ({ 
  handleListItemClick, 
  selectedLeagueUrl 
}: { 
  handleListItemClick: (e: React.MouseEvent<HTMLButtonElement>, selectedLeagueUrl: string) => void, selectedLeagueUrl: string
}) => {
  return (
    <List>
      {LEAGUES_KEYS.map((league) => {
        return (
          <ListItem disablePadding key={league}>
            <ListItemButton
              selected={LEAGUES.get(league) === selectedLeagueUrl}
              onClick={(event: any) => handleListItemClick(event, LEAGUES.get(league) || '')}
            >
              <ListItemText primary={league} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  );
}

export default LeaguesList;
