// import { useContext } from 'react';
// import { PromptContext } from '../../context/prompts/PromptContext';
import Loader from '../loader/loader';

import { UsersIcon } from '@heroicons/react/20/solid';
import { MagicAiIcon } from '../icons/icons';

export default function SearchTextbox({ OnChange, Fetch, loading, prompt }) {
  // const { promptTokens } = useContext(PromptContext);

  return (
    <div className="w-svw pb-4">
      <form onSubmit={Fetch} className="mt-2 flex rounded-md shadow-sm">
        <div className="relative flex  flex-grow items-stretch focus-within:z-50">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <UsersIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="search"
            name="prompt"
            id="prompt"
            autoComplete="off"
            aria-autocomplete="none"
            className="w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 custom-input sm:text-sm sm:leading-6"
            placeholder="¿Como puedo ayudarte hoy?"
            onChange={OnChange}
            value={prompt ? prompt : ''}
          />
        </div>
        <button
          type="submit"
          className="relative pr-2 inline-flex items-center gap-x-1.5 rounded-r-md pl-2 py-2 text-sm font-semibold bg-eco2MainColor hover:bg-darkColor hover:text-lightColor text-white ring-1 ring-inset ring-gray-300"
          disabled={loading}
        >
          {loading ? (
            <Loader className="w-6 h-6 mr-2 top-1 text-gray-200 animate-spin dark:text-gray-600  -mr-[1px]" />
          ) : (
            <MagicAiIcon className=" w-5 h-5 " />
          )}
        </button>
      </form>
      {/* <div className="flex justify-start">
        <span className=" bottom-4 text-eco2MainColor">
          Tokens utilizados para la pregunta: {promptTokens}&nbsp;&nbsp;
        </span>
      </div> */}
    </div>
  );
}
