import { useState, useContext } from 'react';
import Loader from '../loader/loader';
import { PromptContext } from '../../context/prompts/PromptContext';
// import { BarsArrowUpIcon, UsersIcon } from '@heroicons/react/20/solid';
import SearchTextbox from '../searchTextbox/searchTextbox';
import { Welcome } from '../welcome/welcome';
import { ChatgptResponse } from '../../util/api/chatgptResponse';

export default function ChatGpt(props) {
  const user = props.user;

  const {
    prompt,
    response,
    promptTokens,
    setPrompt,
    setResponse,
    setPromptTokens
  } = useContext(PromptContext);

  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const FetchData = async () => {
    if (!prompt) {
      setError('Please type something before submit');
    } else {
      setIsLoading(true);
      // Realiza la llamada a la API
      ChatgptResponse({ prompt: prompt, user: user })
        .then((response) => {
          // console.log('response is:');
          setResponse(response?.data?.data);
          // console.log('response.data.data.trim() is:', response);
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
  const handleChangeTextarea = (e) => {
    setResponse(e.target.value);
  };

  return (
    <div>
      <br></br>
      {response ? (
        <textarea
          rows={8}
          name="comment"
          id="comment"
          className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
          value={response ? response : ''}
          onChange={handleChangeTextarea}
        />
      ) : (
        <>
          <Welcome />
        </>
      )}

      <SearchTextbox OnChange={handleChange} Fetch={FetchData} />
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
