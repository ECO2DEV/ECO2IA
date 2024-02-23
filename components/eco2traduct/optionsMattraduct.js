// components/mattraduct/optionsMattraduct.js
import { useContext, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { DataEco2Traduct } from '../../data/eco2traduct';
import { PromptContext } from '../../context/prompts/PromptContext';
import ShareModal from './ShareModal';
import {
  MinusIcon,
  PlusIcon,
  ShareIcon,
  DocumentArrowDownIcon
  // DocumentIcon,
} from '@heroicons/react/20/solid';
import dynamic from 'next/dynamic';
// Import PDFDownloadLink separately before the component definition
const PDFDownloadLinkDynamic = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false
  }
);

import { HistoryIcon, VolumenSpeakerIcon } from '../icons/icons';
import ExportPDF from './ExportPDF';

const Transcription = dynamic(() => import('./transcript'), { ssr: false });

export default function OptionsMattraduct({
  showThirdTextarea,
  language,
  handleShowThirdTextarea,
  onClick,
  translationResponse,
  prompt
}) {
  // Handler para cambiar el estado de showShare
  const toggleShare = () => {
    setShowShare(!showShare);
  };

  const [showShare, setShowShare] = useState(false);
  // console.log("language" + language)
  const { promptTokens } = useContext(PromptContext);
  return (
    <div className="">
      <nav className="flex justify-center" aria-label="Breadcrumb">
        <ol
          role="list"
          className="flex space-x-2 rounded-md bg-eco2MainColor px-3 py-2 sm:px-6 shadow"
        >
          <li className="flex" title="Historique">
            <div className="flex items-center">
              <button
                onClick={onClick}
                className="text-gray-500 hover:text-gray-500"
              >
                <HistoryIcon className="h-4 w-4 flex-shrink-0 hover:text-gray-600 sm:hover:text-gray-500" />
              </button>
            </div>
          </li>
          <PDFDownloadLinkDynamic
            className={
              !translationResponse ? 'opacity-90 pointer-events-none' : ''
            }
            document={
              <ExportPDF
                prompt={prompt}
                translationResponse={translationResponse}
              />
            }
            fileName="MATTRANSLATE.pdf"
          >
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
                    {DataEco2Traduct.ButtonPDF}{' '}
                  </span>
                </div>
              </button>
            </li>
          </PDFDownloadLinkDynamic>
          {/* <li className="flex items-center">
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
                  {" "}
                  {DataEco2Traduct.ButtonWord}{" "}
                </span>
              </div>
            </button>
          </li> */}
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
            <Popover
              className={
                !translationResponse ? 'opacity-80 pointer-events-none' : ''
              }
            >
              {({ open }) => (
                <>
                  <Popover.Button
                    onClick={toggleShare}
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-800"
                  >
                    <div className="flex justify-center items-center">
                      <ShareIcon
                        className="mr-2 h-4 w-4 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="hidden sm:contents">
                        {DataEco2Traduct.ButtonShare}
                      </span>
                    </div>
                  </Popover.Button>
                  <Transition
                    show={showShare}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                  >
                    <Popover.Panel className="absolute bottom-8 right-0 flex items-center z-10 p-4 w-14 bg-white rounded-lg shadow-lg">
                      {showShare && (
                        <ShareModal translationResponse={translationResponse} />
                      )}
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
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
                    {DataEco2Traduct.ButtonLanguage}{' '}
                  </span>
                </div>
              ) : (
                <div className="flex ">
                  <PlusIcon
                    className="mr-1 h-5 w-5 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="hidden sm:contents">
                    {' '}
                    {DataEco2Traduct.ButtonLanguage}{' '}
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
        <span className=" bottom-4 text-gray-900 dark:text-gray-100">
          Puntos utilizados para la pregunta : {promptTokens}&nbsp;&nbsp;
        </span>
      </div>
    </div>
  );
}
