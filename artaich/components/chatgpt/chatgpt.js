import React, { useState, useContext, useEffect } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import axios from 'axios';
import SearchTextbox from '../searchTextbox/searchTextbox';
import { Welcome } from '../welcome/welcome';
import { Conversations } from './conversations';
import { useChat } from '../../hooks/useChat';
import { ButtonHelper } from '../welcome/buttonHelper';
import ButtonHelperHistory from '../welcome/ButtonHelperHistory';
import { useChat as useChatReact } from 'ai/react';
import { header, strapiUrl } from '../../constants/constans';
import HistoryChat from './HistoryChat';
import { countTokens } from '../../util/helpers/count_tokens';

export const config = {
  runtime: 'edge'
};

export default function ChatGpt(props) {
  const [openHelpers, setOpenHelpers] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { setResponse, setPromptTokens } = useContext(PromptContext);
  const user = props.user;

  const { mutate } = useChat(user);

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
        const reqId = res.data.reqId; // Assuming the response from the backend contains the reqId

        setMessages((prevMessages) => {
          const updatedMessages = prevMessages.map((msg) => {
            if (msg.role === 'assistant') {
              if (msg.reqId === message.reqId) {
                return { ...msg, reqId };
              }
            }
            return msg;
          });

          return updatedMessages;
        });
        setResponse(message.content + input);
        mutate();
      } catch (error) {
        // Handle error here
        console.error('Error:', error);
        setMessages((prevMessages) => [
          ...prevMessages,

          { role: 'assistant', content: '¡Se ha producido un error!' }
        ]);
      } finally {
        setOpenHelpers(false);
      }
    }
  });

  const handleModalHistory = () => {
    setModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if (input === '') {
      setPromptTokens(0);
      return;
    }
    const tokens = countTokens(input);
    setPromptTokens(tokens);
  }, [input]);

  return (
    <>
      <section>
        {messages.length === 0 ? (
          <Welcome setInput={setInput} />
        ) : openHelpers ? (
          <Welcome setInput={setInput} />
        ) : (
          <Conversations messages={messages} />
        )}
        <div className="flex justify-center items-center fixed bottom-3 w-[92%] lg:w-[72.5%] xl:w-[77%] 2xl:max-w-[77rem]">
          <SearchTextbox
            OnChange={handleInputChange}
            Fetch={handleSubmit}
            loading={isLoading}
            prompt={input}
          />
          <div className="flex justify-between gap-2 mb-4">
            <ButtonHelper onClick={() => setOpenHelpers(!openHelpers)} />
            <ButtonHelperHistory onClick={handleModalHistory} />
          </div>
        </div>
      </section>
      {modalOpen && <HistoryChat onClose={handleModalHistory} />}
    </>
  );
}
