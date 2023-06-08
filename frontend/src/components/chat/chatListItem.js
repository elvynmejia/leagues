import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { useTheme } from '@mui/material/styles';
const BouncingDotsLoader = () => <p>Bouncing Dots Loader</p>;
// import BouncingDotsLoader from '../bouncingDots';

const BaseListItem = ({
    key,
    marginLeft,
    background,
    content,
    source,
    isGeneratingResponse
  }) => {
    return (
      <ListItem
        style={{
          borderRadius: '10px',
          width: '500px',
          marginLeft,
          background,
        }}
        component={Paper}
        key={key}
      >
        <BaseListItemText
          source={source}
          isGeneratingResponse={isGeneratingResponse}
          content={content}
        />
      </ListItem>
    );
  };
  
  const BaseListItemText = ({
    source,
    isGeneratingResponse,
    content,
  }) => {
    if (source === 'ai' && isGeneratingResponse) {
      return <ListItemText id="bouncing" primary={<BouncingDotsLoader />} />;
    }
  
    return (
      <ListItemText
        primary={content}
        style={{
          ...(source === 'human' ? { color: 'white' } : {}),
        }}
      />
    );
  };
  
  const ChatListItem = ({
    source,
    key,
    content,
    isGeneratingResponse
  }) => {
    const theme = useTheme();
    if (source === 'human') {
      return (
        <BaseListItem
          key={key}
          marginLeft="auto"
          background={theme.palette.primary.main}
          content={content}
          source={source}
          isGeneratingResponse={isGeneratingResponse}
        />
      );
    }
  
    return (
      <BaseListItem 
        key={key} 
        content={content} 
        source={source} 
        isGeneratingResponse={isGeneratingResponse}
      />
    );
  };

export default ChatListItem;