import { useState, useContext } from 'react';
import Loader from '../loader/loader';
import { PromptContext } from '../../context/prompts/PromptContext';
// import { BarsArrowUpIcon, UsersIcon } from '@heroicons/react/20/solid';
import SearchTextbox from '../searchTextbox/searchTextbox';
import { Welcome } from '../welcome/welcome';
import { ChatgptResponse } from '../../util/api/chatgptResponse';
import { Conversations } from './conversations';
// import { io } from 'socket.io-client';
import { useChat } from '../../hooks/useChat';
import { ButtonHelper } from '../welcome/buttonHelper';

// const socket = io('http://localhost:1337');

export default function ChatGpt(props) {
  const [openHelpers, setOpenHelpers] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const user = props.user;
  const { data, mutate } = useChat();

  const {
    prompt,
    response,
    promptTokens,
    setPrompt,
    setResponse,
    setPromptTokens
  } = useContext(PromptContext);

  const FetchData = async () => {
    if (!prompt) {
      setError('Please type something before submit');
    } else {
      setIsLoading(true);
      // Realiza la llamada a la API
      ChatgptResponse({ prompt: prompt, user: user })
        .then((response) => {
          console.log('response is:');
          setResponse(response?.data?.data);
          // console.log('response.data.data.trim() is:', response?.data?.data);
          // conectar el socket io
          mutate({ data: [...data.data, response?.data], ...data });
          // socket.emit('chat message', response?.data?.data.trim());
        })
        .catch((error) => {
          console.log('error is:', error);
          setError('An error occurred while fetching data.');
        })
        .finally(() => {
          setIsLoading(false);
          setPrompt('');
        });
    }
  };
  const handleChange = (e) => {
    setPrompt(e.target.value);
    if (e.target.value === '') {
      setPromptTokens(0);
    }
  };

  return (
    <div>
      {openHelpers ? <Welcome /> : <Conversations />}
      <div className="flex fixed bottom-9 w-[90%] lg:w-[73%] ">
        <SearchTextbox OnChange={handleChange} Fetch={FetchData} />
        <ButtonHelper onClick={() => setOpenHelpers(!openHelpers)} />
      </div>

      {error && <h4 className="text-red-700"> {error}</h4>}

      <span className="fixed flex bottom-4 text-gray-900">
        {' '}
        Points utilisés pour la question : {promptTokens}&nbsp;&nbsp;
        {loading && <Loader />}{' '}
      </span>

      {/* <div>
                <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
                    <li key={'tokens_prompt'} className="col-span-1 flex rounded-md shadow-sm">
                        <Counter tokens_quantity={prompTokens} token_libelle='Tokens used in this request' bgColor={'bg-green-500'} />
                    </li>
                    <li key={'total_tokens'} className="col-span-1 flex rounded-md shadow-sm">
                        <Counter tokens_quantity={tokensUsed} token_libelle='Total Tokens used in this request' bgColor={'bg-gray-600'} />
                    </li>
                </ul>
            </div> */}
    </div>
  );
}
