import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { PromptContext } from '../../context/prompts/PromptContext';
import { UserContext } from '../../context/user/UserContext';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';
import SearchTextbox from '../searchTextbox/searchTextbox';
import { Welcome } from '../welcome/welcome';
import { Conversations } from './conversations';
import { useChat } from '../../hooks/useChat';
import { useChatSocket } from '../../hooks/useChatSocket';
import { ButtonHelper } from '../welcome/buttonHelper';
import ButtonHelperHistory from '../welcome/ButtonHelperHistory';
import { useChat as useChatReact } from 'ai/react';
import { header, strapiUrl, modelOptions } from '../../constants/constans';
import HistoryChat from './HistoryChat';
// import { countTokens } from '../../util/helpers/count_tokens';
import { SelectModel } from '../ui/SelectModel';
import {
  createConversationSocket,
  createMessageSocket
} from '../../util/api/chatgptResponse';
import { StoreContext } from '../../context/store/StoreContext';
import { SidebarChat } from '../chatsocket/SidebarChat';
import useDeviceDetection from '../../hooks/useDeviceDetection';
export const config = {
  runtime: 'edge'
};

export default function ChatGpt() {
  const [responseModelMap, setResponseModelMap] = useState({});
  const [showHelpMessage, setShowHelpMessage] = useState(false);

  const {
    setOpenHelpers,
    setSelectedModel,
    openHelpers,
    setModalOpen,
    selectedModel,
    modalOpen,
    user
  } = useContext(UserContext);

  const handleModelChange = (option) => {
    setSelectedModel(option.value);
  };

  const { setResponse, setActiveAI } = useContext(PromptContext);
  const {
    selectedConversationId,
    setConversations,
    setSelectedConversarionId
  } = useContext(StoreContext);

  const { mutate } = useChat(user?.id);
  const { mutate: mutateSocket } = useChatSocket();
  const device = useDeviceDetection();

  // console.log('data', data);

  useEffect(() => {
    setActiveAI('ChatGpt');
    setSelectedModel('gpt-3.5-turbo');
  }, []);

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages
  } = useChatReact({
    api: '/api/chat',
    onFinish: async (message) => {
      try {
        const res = await axios.post(
          `${strapiUrl}/api/openai/chatgpt`,
          {
            prompt: input,
            aiResponse: message.content,
            users_permissions_user: user
          },
          header
        );
        // console.log('looking messages', messages);
        const newMessageId = uuidv4();
        const userPromise = await createMessageSocket({
          type: 'user',
          content: input
        });

        const aiPromise = await createMessageSocket({
          type: 'ai',
          content: message.content,
          uuid: newMessageId
        });

        // Ejecutar las promesas en paralelo y esperar a que todas se resuelvan
        try {
          const [resUser, resAI] = await Promise.all([userPromise, aiPromise]);
          // console.log('resUser', resUser.data.data.id, 'resAI', resAI);

          if (
            selectedConversationId === 'new' ||
            selectedConversationId === null
          ) {
            // If there is no conversationId  or if the conversation is new, create a new conversation
            const conveCreated = await createConversationSocket({
              aiMessageId: resUser.data.data.id,
              userMessageId: resAI.data.data.id
            });

            setSelectedConversarionId(conveCreated.data.data.id);
          } else {
            // else update the conversation selected with the new messages(user,ai)
            setConversations({
              aiMessageId: resUser.data.data.id,
              userMessageId: resAI.data.data.id,
              conversationId: selectedConversationId
            });
          }
        } catch (error) {
          console.error('Al menos una de las promesas falló:', error);
        }
        // const reqId = res.data.reqId;

        // setMessages((prevMessages) => {
        //   const updatedMessages = prevMessages.map((msg) => {
        //     if (msg.role === "assistant") {
        //       if (msg.reqId === message.reqId) {
        //         return { ...msg, reqId };
        //       }
        //     }
        //     return msg;
        //   });

        //   return updatedMessages;
        // });

        const newMessage = {
          content: message.content,
          model: selectedModel,
          id: newMessageId,
          role: message.role
        };
        // console.log('objeto del mensage', newMessage);

        setMessages((prevMessages) => {
          const updatedMessages = prevMessages.map((msg) => {
            if (msg.role === 'assistant' && msg.id === message.id) {
              return { ...msg, id: newMessageId };
            }
            return msg;
          });
          return updatedMessages;
        });

        setResponseModelMap((prevMap) => ({
          ...prevMap,
          [newMessage.id]: selectedModel
        }));
        // console.log('set response model map:', setResponseModelMap)

        setResponse(newMessage.content + input);
        // console.log("response + input", setResponse);

        mutate();
        mutateSocket();
      } catch (error) {
        // Handle error here
        console.error('Error:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: '¡Se ha producido un error!' }
        ]);
      } finally {
        setShowHelpMessage(true);
        setOpenHelpers(false);
      }
    },
    body: {
      model: selectedModel
    }
  });

  // useEffect(() => {
  //   if (input === '') {
  //     setPromptTokens(0);
  //     return;
  //   }
  //   const tokens = countTokens(input);
  //   setPromptTokens(tokens);
  // }, [input]);

  return (
    <>
      <section className="dark:bg-darkColor bg-lightColor h-full w-svw sm:w-full">
        {messages.length === 0 && showHelpMessage === false ? (
          <Welcome setInput={setInput} />
        ) : openHelpers ? (
          <Welcome setInput={setInput} />
        ) : (
          <div
            className={`${
              device === 'Desktop' || device === 'Tablet'
                ? 'flex w-full h-full'
                : 'w-full h-full '
            }`}
          >
            <SidebarChat />
            <Conversations
              setMessages={setMessages}
              messages={messages}
              responseModelMap={responseModelMap}
            />
          </div>
        )}
        <div
          className={twMerge(
            'ml-3 sm:ml-0 flex flex-col sm:flex-row sm:items-center sm:justify-center fixed bottom-3 w-[92%]  xl:left-[10%] xl:w-[80%]',
            messages.length === 0 && showHelpMessage === false
              ? 'md:left-[10%] md:w-[75%]'
              : openHelpers
              ? 'md:left-[10%] md:w-[75%]'
              : 'md:left-[32%] md:w-[60%] xl:left-1/4 xl:w-[68%] 2xl:max-w-[77rem]'
          )}
        >
          <SearchTextbox
            OnChange={handleInputChange}
            Fetch={handleSubmit}
            loading={isLoading}
            prompt={input}
          />
          <div className="flex justify-between items-center pt-6 gap-2 mb-4 ">
            <ButtonHelper onClick={() => setOpenHelpers(!openHelpers)} />
            <ButtonHelperHistory onClick={() => setModalOpen(!modalOpen)} />
            <SelectModel
              modelOptions={modelOptions}
              onChange={handleModelChange}
            />
          </div>
        </div>
      </section>
      {modalOpen && <HistoryChat onClose={() => setModalOpen(!modalOpen)} />}
    </>
  );
}
