import { io } from 'socket.io-client';

let socket;
export const connectWithSocketServer = () => {
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
      console.log('session details', data);

      localStorage.setItem('sessionId', sessionId);
      console.log('sessionId', sessionId);
      // setMessages(conversations);
    });
  });
};

export const sendConversationMessage = (message, conversationId) => {
  socket.emit('conversation-message', { message, conversationId });
};
