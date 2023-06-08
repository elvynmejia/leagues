import React, { useState, useEffect, useRef } from 'react';
import uuid from 'short-uuid';

import { useMutation, useQuery } from 'react-query';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';

import ChatListItem from './chatListItem';

import LeagueList from './../leaguesList';

const generateResponse = () => {
  return [
    {
      text: 'This is a test for a chat app'
    }
  ]
}

// type Message = {
//   source: 'human' | 'ai',
//   content: string | JSX.Element | JSX.Element[],
//   createdAt: number,
//   isGeneratingResponse?: boolean,
//   uuid: string,
// };

// const initialPrompt = [
//   <>
//     <h6>Choose a league you are interested in</h6>
//     <LeagueList />
//   </>
// ];

const Chat = ({ initialState }) => {

  const aiPrompt = {
    source: 'ai',
    content: initialState,
    createdAt: new Date().getTime(),
    uuid: uuid.generate(),
  };
  
  const chatFooterHeight = document.getElementById('chat-footer')?.clientHeight;

  const messagesContainerRef = useRef(null);

  const [messages, setMessages] = useState([aiPrompt]);

  const [message, setMessage] = useState('');

  const [isAiGeneratingResponse, setIsAiGeneratingResponse] = useState(false);

  useEffect(() => {
    // Scroll to the bottom of the messages container when new messages are added
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [messages]);

  const mutation = useMutation(generateResponse, {
    onSuccess: (data) => {
      // Invalidate and refetch
      // queryClient.invalidateQueries('key')
      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        const updatedMessage = {
          ...lastMessage,
          content: data[0].text,
          isGeneratingResponse: false,
        };

        return prevMessages.map((msg) => {
          return msg.uuid === lastMessage.uuid ? updatedMessage : msg;
        });
      });

      setIsAiGeneratingResponse(false);
    },
  });

  const submitMessage = (event) => {
    if (message === '') return;

    setMessages([
      ...messages,
      {
        source: 'human',
        content: message,
        createdAt: new Date().getTime(),
        uuid: uuid.generate(),
      },
      {
        source: 'ai',
        content: '',
        createdAt: new Date().getTime(),
        isGeneratingResponse: true,
        uuid: uuid.generate(),
      },
    ]);

    setIsAiGeneratingResponse(true);
    
    mutation.mutate(message);

    setMessage('');
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleEnter = (event) => {
    if (message === '' || event.code !== 'Enter') {
      return;
    }
    submitMessage(event);
  };

  return (
    <Paper
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: '10px',
        padding: '10px'
      }}
    >
      <div
        ref={messagesContainerRef}
        style={{
          height: `calc(100% - ${chatFooterHeight}px)`,
          overflow: 'auto',
          marginBottom: '10px',
        }}
      >
        <List>
          {messages.map(
            ({ source, content, createdAt, isGeneratingResponse, uuid }) => {
              const key = [uuid + createdAt].join('-');
              return (
                <ChatListItem
                  key={key}
                  source={source}
                  isGeneratingResponse={!!isGeneratingResponse}
                  content={content}
                />
              );
            }
          )}
        </List>
      </div>
      <div
        id="chat-footer"
        style={{
          marginTop: '10px',
          position: 'sticky',
          bottom: 0,
          paddingBottom: '10px',
          zIndex: 999,
        }}
      >
        <OutlinedInput
          style={{ width: '100%' }}
          placeholder="Type your next question"
          onChange={handleInputChange}
          value={message}
          disabled={isAiGeneratingResponse}
          onKeyDown={handleEnter}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                color="primary"
                onClick={submitMessage}
                disabled={isAiGeneratingResponse}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
    </Paper>
  );
};

export default Chat;