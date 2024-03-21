import React from 'react';

const Chatia = () => {
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
  return (
    <aside className="min-w-64 h-full bg-gray-800 flex flex-col">
      <NewChatButton />
      <ListItems title="something" />
      <ListItems title="hey " />
      <ListItems title="Whats up" />
      <DeleteConversation />
    </aside>
  );
};

const Chat = () => {
  return (
    <div className="flex flex-col flex-grow h-full">
      <h1>Chat</h1>
    </div>
  );
};

const NewChatButton = () => {
  return (
    <div
      className="flex items-center gap-2 text-white m-1 w-60 h-11 border border-gray-200 rounded-lg transition hover:opacity-70"
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
