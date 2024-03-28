import { useState, useRef, useEffect, useContext } from 'react';
import {
  connectWithSocketServer,
  sendConversationMessage
} from '../util/socket/socketconnect';
import { v4 as uuidv4 } from 'uuid';
import { StoreContext } from '../context/store/StoreContext';

const Chatia = () => {
  const { setMessages } = useContext(StoreContext);
  useEffect(() => {
    connectWithSocketServer();
  }, []);
  return <Dashboard />;
};

export default Chatia;

const Dashboard = () => {
  return (
    <section className="w-full h-screen flex">
      <Sidebar />
      <Chat />
    </section>
  );
};

const Sidebar = () => {
  const { setSelectedConversarionId, conversations } = useContext(StoreContext);

  const handleSetSelectedChat = (chatId) => {
    setSelectedConversarionId(chatId);
  };

  return (
    <aside className="min-w-64 h-full bg-gray-800 flex flex-col">
      <NewChatButton handleSetSelectedChat={handleSetSelectedChat} />
      {conversations.map((conv) => (
        <ListItems
          key={conv.id}
          title={conv.messages[0].content}
          chatId={conv.id}
        />
      ))}
      <DeleteConversation />
    </aside>
  );
};

const NewChatButton = ({ handleSetSelectedChat }) => {
  const handleChooseNewChat = () => {
    handleSetSelectedChat('new');
  };
  return (
    <div
      className="flex items-center gap-2 text-white m-1 w-60 h-11 border border-gray-200 rounded-lg transition hover:opacity-70"
      onClick={handleChooseNewChat}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pl-1 icon icon-tabler icons-tabler-outline icon-tabler-plus"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 5l0 14" />
        <path d="M5 12l14 0" />
      </svg>
      <p>New chat</p>
    </div>
  );
};

const ListItems = ({ title }) => {
  return (
    <div
      className="pl-1 flex items-center gap-2 text-white m-1 w-60 h-11  rounded-lg transition hover:opacity-70"
      onClick={() => {}}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-message"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 9h8" />
        <path d="M8 13h6" />
        <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
      </svg>
      <p>{title}</p>
    </div>
  );
};

const DeleteConversation = () => {
  return (
    <div
      className="pl-1 flex items-center gap-2  text-white m-1 w-60 h-11  rounded-lg transition hover:opacity-70 mt-auto"
      onClick={() => {}}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 7l16 0" />
        <path d="M10 11l0 6" />
        <path d="M14 11l0 6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </svg>
      <p>Delete conversation</p>
    </div>
  );
};

const Chat = () => {
  const { selectedConversationId } = useContext(StoreContext);
  return (
    <div className="flex flex-col flex-grow h-full">
      {!selectedConversationId ? (
        <ChatLogo />
      ) : (
        <>
          {' '}
          <Messages />
          <NewMessageInput />
        </>
      )}
    </div>
  );
};

const ChatLogo = () => {
  return (
    <div className="grow h-full flex justify-center items-center">
      <p className="text-white font-semibold text-5xl">Chatgpt</p>
    </div>
  );
};

const Messages = () => {
  const { conversations, selectedConversationId } = useContext(StoreContext);

  const conversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  return (
    <section className="flex flex-col flex-grow h-full">
      {conversation?.messages.map((messa, index) => (
        <Message
          key={messa.id}
          content={messa.content}
          aiMessage={messa.aiMessage}
          animate={
            index === conversation.messages.length - 1 && messa.aiMessage
          }
        />
      ))}
    </section>
  );
};

const SlowText = (props) => {
  const { speed, text } = props;
  const [placeholder, setPlaceholder] = useState(text[0]);
  const index = useRef(0);
  useEffect(() => {
    function tick() {
      index.current++;
      setPlaceholder(text.slice(0, index.current));
    }

    const interval = setInterval(tick, speed);
    return () => clearInterval(interval);
  }, [placeholder, speed, text]);
  return <span>{placeholder}</span>;
};

const Message = ({ content, aiMessage, animate }) => {
  return (
    <article
      className={`flex flex-col items-center justify-center ${
        aiMessage ? ' bg-gray-300' : 'dark:bg-darkColor bg-lightColor'
      }`}
    >
      {' '}
      <div className="mx-auto flex justify-center items-center gap-2">
        <div>
          {aiMessage ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-brand-openai dark:text-white text-black"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M11.217 19.384a3.501 3.501 0 0 0 6.783 -1.217v-5.167l-6 -3.35" />
              <path d="M5.214 15.014a3.501 3.501 0 0 0 4.446 5.266l4.34 -2.534v-6.946" />
              <path d="M6 7.63c-1.391 -.236 -2.787 .395 -3.534 1.689a3.474 3.474 0 0 0 1.271 4.745l4.263 2.514l6 -3.348" />
              <path d="M12.783 4.616a3.501 3.501 0 0 0 -6.783 1.217v5.067l6 3.45" />
              <path d="M18.786 8.986a3.501 3.501 0 0 0 -4.446 -5.266l-4.34 2.534v6.946" />
              <path d="M18 16.302c1.391 .236 2.787 -.395 3.534 -1.689a3.474 3.474 0 0 0 -1.271 -4.745l-4.308 -2.514l-5.955 3.42" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-user dark:text-white text-black"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            </svg>
          )}
        </div>
        <p className="dark:text-white text-black">
          {animate ? <SlowText speed={20} text={content} /> : content}
        </p>
      </div>
    </article>
  );
};

const NewMessageInput = () => {
  const [messageSent, setMessageSent] = useState(false); // State to track if message is sent

  const {
    selectedConversationId,
    setConversations,
    content,
    setContent,
    setSelectedConversarionId
  } = useContext(StoreContext);

  function proceedMessage() {
    const message = {
      aiMessage: false,
      content: content,
      id: uuidv4(),
      animate: false
    };

    console.log('this is the message', message);
    const conversationId =
      selectedConversationId === 'new' ? uuidv4() : selectedConversationId;

    setConversations({ message, conversationId });

    setSelectedConversarionId(conversationId);
    // Send message to the server
    sendConversationMessage(message, conversationId);
    setMessageSent(true);
  }

  function handleSendMessage(e) {
    e.preventDefault();
    if (content.length > 0) {
      proceedMessage();
    }
    setContent('');
  }

  function handleChange(e) {
    setContent(e.target.value);
    setMessageSent(false);
  }

  return (
    <form onSubmit={handleSendMessage} className="relative w-full h-20 ">
      <input
        className="mx-auto flex justify-center items-center rounded-xl w-5/6  border-gray-200 border-none outline-none focus:border-none focus:outline-none focus:ring-0 hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all duration-300 ease-in-out"
        placeholder="Envia un mensaje..."
        onChange={handleChange}
        value={content}
        type="text"
      />
      <button
        type="submit"
        className="absolute right-24 top-2 cursor-pointer hover:opacity-60"
        // onClick={handleSendMessage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-send text-black"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 14l11 -11" />
          <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
        </svg>
      </button>
    </form>
  );
};
