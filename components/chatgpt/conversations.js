import { useRef, useState, useEffect, useContext } from 'react';

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { handleCopy, handleCopyCode } from '../../util/helpers/handleCopy';
import { UserContext } from '../../context/user/UserContext';
import { useChat } from '../../hooks/useChat';
import { modelOptions } from '../../constants/constans';

import ModalDelete from './ModalDelete';
import { LoadingChatgpt } from './LoadingChatgpt';

// import { PromptContext } from '../../context/prompts/PromptContext';
import { StoreContext } from '../../context/store/StoreContext';
import { useChatSocket } from '../../hooks/useChatSocket';

import ListMessages from '../chatsocket/ListMessages';
import ListMessagesSdk from '../chatsocket/ListMessagesSdk';

export const Conversations = ({ messages, responseModelMap, setMessages }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { user } = useContext(UserContext);
  // const { activeAI } = useContext(PromptContext);

  const { selectedConversationId, setSelectedConversarionId } =
    useContext(StoreContext);

  // start the new conversation just with the new message, remove the previous messages when user pick new chat, use the setMessages function

  const { data } = useChatSocket();

  const findConve = data?.data?.find(
    (conve) => conve.id === selectedConversationId
  );

  // sort the messages in descending order by id( this put the last message at the bottom of the chat window)
  const messagesSorted = findConve?.attributes?.messages?.data?.sort(
    (a, b) => a.id - b.id
  );
  // console.log('order messages', messagesSorted);
  // console.log('findConve', findConve);
  const { isLoading, deleteChat } = useChat(user?.id);

  const messagesEndRef = useRef(null);

  const getModelIcon = (model) => {
    const modelOption = modelOptions.find((option) => option.value === model);
    if (modelOption) {
      return modelOption.icon;
    } else {
      // console.warn("Model not found in options:", model);
      return null;
    }
  };

  const onHandleModalDelete = (id) => {
    setDeleteModalOpen((prev) => !prev);
    setDeleteId(id);
  };
  if (isLoading) {
    return <LoadingChatgpt />;
  }

  useEffect(() => {
    if (messages || messagesSorted) {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, messagesSorted]);

  useEffect(() => {
    if (selectedConversationId === 'new') {
      // Create a title message for the new conversation with the model name
      setMessages([]);
      setSelectedConversarionId(null);
    }
  }, [selectedConversationId]);

  return (
    <div className="mr-3 sm:pr-0 sm:mr-0 w-svw h-screen sm:flex-1 z-1 sm:z-0">
      <section className="flex flex-col text-sm  h-[85vh] sm:h-[90vh] overflow-y-scroll  overflow-x-hidden scrollsidebar-color dark:scrollsidebar-color-ligth">
        {selectedConversationId === 'new' || selectedConversationId === null ? (
          <>
            {/* if the conversation is new or null, show the messages directly from vercel sdk */}
            {messages &&
              messages?.map((item, index) => (
                <ListMessagesSdk
                  key={item.id}
                  item={item}
                  handleCopy={handleCopy}
                  handleCopyCode={handleCopyCode}
                  responseModelMap={responseModelMap}
                  getModelIcon={getModelIcon}
                  index={index}
                />
              ))}
          </>
        ) : (
          <>
            {/* else the conversation is not new, show the messages from the strapi backend */}
            {messagesSorted
              ?.slice() // Create a copy of the array
              .map((item, index) => (
                <ListMessages
                  key={item.id}
                  item={item}
                  handleCopy={handleCopy}
                  handleCopyCode={handleCopyCode}
                  getModelIcon={getModelIcon}
                  index={index}
                />
              ))}
          </>
        )}
        <div ref={messagesEndRef}></div>
      </section>
      {deleteModalOpen && (
        <ModalDelete
          onClose={onHandleModalDelete}
          onHandleDelete={() => deleteChat(deleteId)}
        />
      )}
    </div>
  );
};
