import { useContext } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import Loader from '../loader/loader';

import { UsersIcon } from '@heroicons/react/20/solid';
import { MagicAiIcon } from '../icons/icons';

export default function SearchTextboxDalle({ OnChange, Fetch, loading }) {
  const { prompt } = useContext(PromptContext);

  return (
    <div className="flex-1">
      <form onSubmit={Fetch} className="mt-2 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <UsersIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>

          <input
            type="text"
            name="prompt"
            id="prompt"
            className="w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="¿Como puedo ayudarte hoy?"
            onChange={OnChange}
            value={prompt ? prompt : ''}
          />
        </div>
        <button
          type="submit"
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold bg-eco2MainColor text-white ring-1 ring-inset ring-gray-300 hover:bg-darkHoverColor transition-colors duration-500 ease-in-out"
          disabled={loading}
        >
          {loading ? (
            <Loader />
          ) : (
            <MagicAiIcon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </form>
    </div>
  );
}
