import { useContext } from 'react';
import { DataMatTraduct } from '../../data/mattraduct';
import { PromptContext } from '../../context/prompts/PromptContext';
import {
  MinusIcon,
  PlusIcon,
  ShareIcon,
  DocumentArrowDownIcon,
  DocumentIcon
} from '@heroicons/react/20/solid';
import dynamic from 'next/dynamic';

import { HistoryIcon, VolumenSpeakerIcon } from '../icons/icons';

const Transcription = dynamic(() => import('./transcript'), { ssr: false });

export default function OptionsMattraduct({
  showThirdTextarea,
  language,
  handleShowThirdTextarea,
  onClick
}) {
 // console.log("language" + language)
  const { promptTokens } = useContext(PromptContext);
  return (
    <div className="">
      <nav className="flex" aria-label="Breadcrumb">
        <ol
          role="list"
          className="flex space-x-4 rounded-md bg-gray-50 px-6 shadow"
        >
          <li className="flex">
            <div className="flex items-center">
              <button
                onClick={onClick}
                className="text-gray-500 hover:text-gray-500"
              >
                <HistoryIcon className="h-4 w-4 flex-shrink-0 hover:text-gray-600 sm:hover:text-gray-500" />
              </button>
            </div>
          </li>
          <li className="flex items-center">
            <svg
              className="h-full text-xs w-5 flex-shrink-0 text-gray-200"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <button className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-800">
              <div className="flex justify-center items-center">
                <DocumentArrowDownIcon
                  className=" mr-2 h-4 w-4 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="hidden sm:contents">
                  {' '}
                  {DataMatTraduct.ButtonPDF}{' '}
                </span>
              </div>
            </button>
          </li>
          <li className="flex items-center">
            <svg
              className="h-full text-xs w-5 flex-shrink-0 text-gray-200"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <button className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-800">
              <div className="flex justify-center items-center">
                <DocumentIcon
                  className=" mr-2 h-4 w-4 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="hidden sm:contents">
                  {' '}
                  {DataMatTraduct.ButtonWord}{' '}
                </span>
              </div>
            </button>
          </li>
          <li className="flex items-center">
            <svg
              className="h-full text-xs w-5 flex-shrink-0 text-gray-200"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>

            <button className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-800">
              <div className="flex justify-center items-center">
                <ShareIcon
                  className=" mr-2 h-4 w-4 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="hidden sm:contents">
                  {' '}
                  {DataMatTraduct.ButtonShare}{' '}
                </span>
              </div>
            </button>
          </li>
          <li className="flex items-center">
            <svg
              className="h-full text-xs w-5 flex-shrink-0 text-gray-200"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <button
              onClick={handleShowThirdTextarea}
              className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-800"
            >
              {showThirdTextarea ? (
                <div className="flex">
                  <MinusIcon
                    className="mr-1 h-5 w-5 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="hidden sm:contents">
                    {' '}
                    {DataMatTraduct.ButtonLanguage}{' '}
                  </span>
                </div>
              ) : (
                <div className="flex ">
                  <PlusIcon
                    className=" mr-1 h-5 w-5 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="hidden sm:contents">
                    {' '}
                    {DataMatTraduct.ButtonLanguage}{' '}
                  </span>
                </div>
              )}
            </button>
          </li>
          <li className="flex items-center">
            <svg
              className="h-full text-xs w-5 flex-shrink-0 text-gray-200"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>

            <div className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-800">
              <div className="flex justify-center items-center">
                <Transcription
                  className=" mr-2 h-4 w-4 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                  aria-hidden="true"
                  language={language}
                />
              </div>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex justify-center items-center my-2">
        <span className=" bottom-4 text-gray-900">
          Points utilisés pour la question : {promptTokens}&nbsp;&nbsp;
        </span>
      </div>
    </div>
  );
}
