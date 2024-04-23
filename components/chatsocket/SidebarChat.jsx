import { useContext } from 'react';
import { useChatSocket } from '../../hooks/useChatSocket';
import { StoreContext } from '../../context/store/StoreContext';
import { ListItems } from './ListItems';
import { NewChatButton } from './NewChatButton';
import useDeviceDetection from '../../hooks/useDeviceDetection';
import { MobileConversationSidebar } from './MobileConversationSidebar';

export const SidebarChat = () => {
  const { data } = useChatSocket(); // Usar el hook useChatSocket

  // console.log('data', data?.data, 'and loading', isLoading);
  const { setSelectedConversarionId } = useContext(StoreContext);

  // console.log('selected conversation id', selectedConversationId);

  const handleSetSelectedChat = (chatId) => {
    setSelectedConversarionId(chatId);
  };

  const device = useDeviceDetection();

  if (device === 'Desktop' || device === 'Tablet') {
    return (
      <aside
        className={` hover:overflow-y-scroll overflow-x-hidden dark:scrollsidebar-color scrollsidebar-color-ligth sm:flex flex-col max-w-64 h-full bg-darkColor dark:bg-lightColor  `}
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
  } else {
    return <MobileConversationSidebar />;
  }
};

