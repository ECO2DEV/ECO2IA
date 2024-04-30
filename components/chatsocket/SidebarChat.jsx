import { useContext } from 'react';
import { useChatSocket } from '../../hooks/useChatSocket';
import { StoreContext } from '../../context/store/StoreContext';
import { ListItems } from './ListItems';
import { NewChatButton } from './NewChatButton';
import useDeviceDetection from '../../hooks/useDeviceDetection';
import { UserContext } from '../../context/user/UserContext';

export const SidebarChat = ({setShowHelpMessage}) => {
  const { data } = useChatSocket(); // Usar el hook useChatSocket

  // console.log('data', data?.data, 'and loading', isLoading);
  const { setSelectedConversarionId } = useContext(StoreContext);
  const  {setOpenHelpers} = useContext(UserContext);

  // console.log('selected conversation id', selectedConversationId);

  const handleSetSelectedChat = (chatId) => {
    setShowHelpMessage(true);
    setOpenHelpers(false);
    setSelectedConversarionId(chatId);
  };

  const device = useDeviceDetection();

  if (device === 'Desktop' || device === 'Tablet') {
    return (
      <aside
        className={` overflow-y-auto overflow-x-hidden dark:scrollsidebar-color scrollsidebar-color-ligth sm:flex flex-col max-w-64 h-full bg-no-repeat aspect-video w-full bg-cover bg-center bg-[url('/bgDark.svg')] dark:bg-[url('/bgLight.svg')] `}
      >
        <NewChatButton handleSetSelectedChat={handleSetSelectedChat} />
        {data?.data &&
          data.data.map((conv) => {
            const userMessage = conv?.attributes?.messages?.data.find(
              (msg) => msg.attributes.aiMessage === false
            );

            return (
              <ListItems
                key={conv.id}
                title={
                  userMessage?.attributes?.content
                    ? userMessage.attributes.content
                    : 'No messages'
                }
                conversationId={conv.id}
                handleSetSelectedChat={handleSetSelectedChat}
              />
            );
          })}
      </aside>
    );
  } 
};

