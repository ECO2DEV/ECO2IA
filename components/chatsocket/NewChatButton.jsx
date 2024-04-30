export  const NewChatButton = ({ handleSetSelectedChat }) => {
  const handleChooseNewChat = () => {
    handleSetSelectedChat('new');
  };
  return (
    <div
      className="flex items-center gap-2 text-white dark:text-black dark:border-gray-900 m-2 w-[90%] cursor-pointer h-11 border border-gray-200 rounded-lg transition hover:opacity-70"
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
      <p >Nueva conversación</p>
    </div>
  );
};
