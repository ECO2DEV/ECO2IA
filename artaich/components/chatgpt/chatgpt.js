import { useState, useContext } from 'react';
import Loader from '../loader/loader';
import { PromptContext } from '../../context/prompts/PromptContext';
// import { BarsArrowUpIcon, UsersIcon } from '@heroicons/react/20/solid';
import SearchTextbox from '../searchTextbox/searchTextbox';
import { Welcome } from '../welcome/welcome';
import { ChatgptResponse } from '../../util/api/chatgptResponse';
import { Conversations } from './conversations';
import { useChat } from '../../hooks/useChat';
import { ButtonHelper } from '../welcome/buttonHelper';

export default function ChatGpt(props) {
  const [openHelpers, setOpenHelpers] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const user = props.user;
  const { data, mutate } = useChat(user);

  const { prompt, promptTokens, setPrompt, setResponse, setPromptTokens } =
    useContext(PromptContext);

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
          setOpenHelpers(false);
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
      {data?.data?.length === 0 ? (
        <Welcome />
      ) : openHelpers ? (
        <Welcome />
      ) : (
        <Conversations />
      )}
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
    </div>
  );
}
