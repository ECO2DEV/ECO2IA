import { useState, useContext, useEffect } from 'react';

import { PromptContext } from '../../context/prompts/PromptContext';
// import { BarsArrowUpIcon, UsersIcon } from '@heroicons/react/20/solid';
import SearchTextbox from '../searchTextbox/searchTextbox';
import { Welcome } from '../welcome/welcome';
import { ChatgptResponse } from '../../util/api/chatgptResponse';
import { Conversations } from './conversations';
import { useChat } from '../../hooks/useChat';
import { ButtonHelper } from '../welcome/buttonHelper';

import { useChat as useChatReact } from 'ai/react';
import axios from 'axios';
import { header, strapiUrl } from '../../constants/constans';

export const config = {
  runtime: 'edge'
};

export default function ChatGpt(props) {
  const [openHelpers, setOpenHelpers] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setResponse, setPromptTokens } = useContext(PromptContext);
  const user = props.user;

  const { data, mutate } = useChat(user);
   console.log(user);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages
  } = useChatReact({
    api: '/api/chat',
    onFinish: async (message) => {
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
      // setPromptTokens(input);
      setResponse(message.content);

      // console.log('Json.stringify(message):', JSON.stringify(message));
    }
  });

  return (
    <section>
      {messages.length === 0 ? (
        <Welcome />
      ) : openHelpers ? (
        <Welcome />
      ) : (
        <Conversations messages={messages} />
      )}
      <div className="flex justify-center fixed bottom-3 w-[92%] lg:w-[72.5%] xl:w-[77%] 2xl:max-w-[77rem]">
        <SearchTextbox
          OnChange={handleInputChange}
          Fetch={handleSubmit}
          loading={isLoading}
          prompt={input}
        />
        <ButtonHelper onClick={() => setOpenHelpers(!openHelpers)} />
      </div>

      {error && <h4 className="text-red-700"> {error}</h4>}
    </section>
  );
}
