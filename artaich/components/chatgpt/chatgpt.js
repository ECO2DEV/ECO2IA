import { useState, useContext } from 'react';

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

  const { prompt, setPrompt, setResponse, setPromptTokens } =
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
          // console.log('response.data.data.trim() is:', response);
          mutate({ data: [...data.data, response?.data], ...data });
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
    <section>
      {data?.data?.length === 0 ? (
        <Welcome />
      ) : openHelpers ? (
        <Welcome />
      ) : (
        <Conversations />
      )}
      <div className="flex justify-center fixed bottom-3 w-[92%] lg:w-[72.5%] xl:w-[77%] 2xl:max-w-[77rem]">
        <SearchTextbox
          OnChange={handleChange}
          Fetch={FetchData}
          loading={loading}
        />
        <ButtonHelper onClick={() => setOpenHelpers(!openHelpers)} />
      </div>

      {error && <h4 className="text-red-700"> {error}</h4>}
    </section>
  );
}
