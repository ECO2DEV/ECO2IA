import { io } from 'socket.io-client';

let socket;
export const connectWithSocketServer = (
  addMessages,
  setConversationHistory
) => {
  socket = io('http://localhost:1337');

  socket.on('connect', () => {
    console.log('connected to server');
    console.log('socket-id', socket.id);

    // get session history
    socket.emit('session-history', {
      sessionId: localStorage.getItem('sessionId')
    });

    socket.on('session-details', (data) => {
      const { sessionId, conversations } = data;
      console.log('sessionId inside sessiondatails front', data);

      localStorage.setItem('sessionId', sessionId);
      // console.log('sessionId inside sessiondatails front', sessionId);
      addMessages(conversations);
    });

    socket.on('conversation-details', (conversation) => {
      setConversationHistory(conversation);
    });
  });
};

export const sendConversationMessage = (message, conversationId) => {
  socket.emit('conversation-message', {
    sessionId: localStorage.getItem('sessionId'),
    message,
    conversationId
  });
};

export const deleteConversations = () => {
  socket.emit('delete-conversations', {
    sessionId: localStorage.getItem('sessionId')
  });
};
