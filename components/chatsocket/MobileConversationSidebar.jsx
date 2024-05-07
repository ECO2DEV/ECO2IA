
import { useContext, useState, useEffect} from 'react';
import { useChatSocket } from '../../hooks/useChatSocket';
import { StoreContext } from '../../context/store/StoreContext';
import { ArrowLeftSidebar } from '../icons/icons';
import { NewChatButton } from './NewChatButton';
import { ListItems } from './ListItems';
import { useRouter } from "next/router";

import { AnimatePresence } from "framer-motion";
import { UserContext } from '../../context/user/UserContext';

export const MobileConversationSidebar = ({ setShowHelpMessage}) => {
  const [isActive, setIsActive] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);


 
  return(
    <>
      <div className="relative uppercase text-xs ">
        <div
          onClick={() => {
            setIsActive(!isActive);
          }}
          className="fixed left-[20px] top-[16px] w-[45px] h-[45px] rounded-full bg-eco2MainColor flex flex-col items-center z-50"
        >
          {isActive ? (
            <button
              onClick={() => setIsActive(!isActive)}
              className={`animate-pulse grow flex items-center justify-center btn btn2 pl-[6px]`}
            >
              <ArrowLeftSidebar className="w-6 h-6" />  
               
               
            </button>
          ) : (
            <button
              onClick={() => setIsActive(!isActive)}
              className={`grow flex items-center justify-center btn`}
            >
               
               
              <ArrowLeftSidebar className="w-6 h-6" />  
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isActive && <Aside setIsActive={setIsActive} setShowHelpMessage={setShowHelpMessage}  />}
      </AnimatePresence>
       
    </>
  )
};



const Aside = ({setIsActive,setShowHelpMessage}) => {
  const { data } = useChatSocket();

  // console.log('data', data?.data, 'and loading', isLoading);
  const { setSelectedConversarionId } = useContext(StoreContext);
  const {setOpenHelpers} = useContext(UserContext);
  // console.log('selected conversation id', selectedConversationId);

  const handleSetSelectedChat = (chatId) => {
    setShowHelpMessage(true);
    setOpenHelpers(false);
    setSelectedConversarionId(chatId);
    setIsActive(false);
  };
  return (
    <aside
      className={`h-screen  fixed left-0 top-0 z-40  overflow-y-auto overflow-x-hidden dark:scrollsidebar-color scrollsidebar-color-ligth rounded-l-xl w-[75%] bg-darkColor dark:bg-lightColor')]`}
    >
      <div className="mt-16">

      <NewChatButton handleSetSelectedChat={handleSetSelectedChat} />
      </div>
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
}; 
