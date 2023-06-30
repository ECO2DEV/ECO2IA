import { useContext } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import Loader from '../loader/loader';

import { BarsArrowUpIcon, UsersIcon } from '@heroicons/react/20/solid';

export default function SearchTextbox({ OnChange, Fetch, loading }) {
  const { prompt, promptTokens } = useContext(PromptContext);

  return (
    <div className="flex-1">
      {/* <label
        htmlFor="text"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Demander Quelque chose
      </label> */}
      <div className="mt-2 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <UsersIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="prompt"
            id="prompt"
            className="w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Comment je peux te servir aujourd'hui"
            onChange={OnChange}
            value={prompt ? prompt : ''}
          />
        </div>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold bg-indigo-600 text-white ring-1 ring-inset ring-gray-300"
          onClick={Fetch}
        >
          <BarsArrowUpIcon className="-ml-0.5 h-5 w-5 text-white" />
          Send
        </button>
      </div>
      <div className="flex justify-start">
        <span className=" bottom-4 text-gray-900">
          Points utilisés pour la question : {promptTokens}&nbsp;&nbsp;
        </span>
        <span>{loading && <Loader />}</span>
      </div>
    </div>
  );
}
