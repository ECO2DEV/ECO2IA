import { useContext, useEffect } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import { UserContext } from '../../context/user/UserContext';

import axios from 'axios';
import SearchTextbox from '../searchTextbox/searchTextbox';
import { Welcome } from '../welcome/welcome';
import { Conversations } from './conversations';
import { useChat } from '../../hooks/useChat';
import { ButtonHelper } from '../welcome/buttonHelper';
import ButtonHelperHistory from '../welcome/ButtonHelperHistory';
import { useChat as useChatReact } from 'ai/react';
import { header, strapiUrl, modelOptions } from '../../constants/constans';
import HistoryChat from './HistoryChat';
import { countTokens } from '../../util/helpers/count_tokens';
import { SelectModel } from '../ui/SelectModel';

export const config = {
  runtime: 'edge'
};

export default function ChatGpt() {
  const {
    setOpenHelpers,
    setSelectedModel,
    openHelpers,
    setModalOpen,
    selectedModel,
    modalOpen,
    user
  } = useContext(UserContext);

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const { ...state } =
    useContext(PromptContext);

  const { mutate } = useChat(user?.id);

  useEffect(() => {
    state.setActiveAI('ChatGpt');
    // setActiveAI('ChatGpt');
    setSelectedModel('gpt-3.5-turbo');
  }, []);

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
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

        state.setResponse(message.content + input);

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
    },
    body: {
      model: selectedModel
    }
  });

  useEffect(() => {
    if (input === '') {
      state.setPromptTokens(0);
      return;
    }
    const tokens = countTokens(input);
    state.setPromptTokens(tokens);
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
        <div className="flex justify-center flex-col-reverse md:flex-row items-center fixed bottom-3 w-[92%] lg:w-[72.5%] xl:w-[77%] 2xl:max-w-[77rem]">
          <SearchTextbox
            OnChange={handleInputChange}
            Fetch={handleSubmit}
            loading={isLoading}
            prompt={input}
          />
          <div className="hidden md:flex justify-between items-center gap-2 mb-4">
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
