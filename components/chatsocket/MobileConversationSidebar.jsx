
import { useContext } from 'react';
import { useChatSocket } from '../../hooks/useChatSocket';
import { StoreContext } from '../../context/store/StoreContext';
import { ArrowLeftSidebar } from '../icons/icons';
import { NewChatButton } from './NewChatButton';
import { ListItems } from './ListItems';


export const MobileConversationSidebar = () => {
  const { data } = useChatSocket(); 

  // console.log('data', data?.data, 'and loading', isLoading);
  const { setSelectedConversarionId } = useContext(StoreContext);

  // console.log('selected conversation id', selectedConversationId);

  const handleSetSelectedChat = (chatId) => {
    setSelectedConversarionId(chatId);
  };

  return (
    <div className="menu-container ">
      <label
        htmlFor="menu-checkbox"
        className="menu-toggler hover:cursor-pointer dark:bg-lightColor bg-darkColor"
      >
      <ArrowLeftSidebar />
      </label>
      <input type="checkbox" id="menu-checkbox" />
      <div className="menu">
        <aside
          className={` hover:overflow-y-scroll overflow-x-hidden dark:scrollsidebar-color scrollsidebar-color-ligth  max-w-64 h-full bg-darkColor dark:bg-lightColor  rounded-l-xl `}
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
      </div>
    </div>
  );
};
