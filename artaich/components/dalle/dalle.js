import { useState, useContext } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import SearchTextbox from '../searchTextbox/searchTextbox';
import { DalleResponse } from '../../util/api/dalleResponse';
import countTokens from '../../util/helpers/count_tokens';
import Loader from '../loader/loader';
import ia_chat from "../../public/ia_chat.png";
import Image from 'next/image';

export default function DalleIA() {
  const [showDropdown, setShowDropdown] = useState(false)

  const { prompt, setPrompt, promptTokens, setPromptTokens } =
    useContext(PromptContext);

  const [imageSrc, setImageSrc] = useState('');
  const [loading, setIsLoading] = useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  const handleChange = (e) => {
    let tokens = countTokens(e.target.value);
    setPrompt(e.target.value);
    setPromptTokens(tokens);
  };

  const FetchData = async () => {
    if (!prompt) {
      setError('Please type something before submit');
    } else {
      setIsLoading(true);
      DalleResponse({ prompt: prompt })
        .then((response) => {
          setImageSrc(response?.data?.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  return (
    <div className='relative'>
      <br></br>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <img src={imageSrc && imageSrc[0].url} onLoad={() => setShowDropdown(true)} />
        </div>
        <br></br>
        <div style={{ flex: 1 }}>
          {imageSrc ? <img src={imageSrc && imageSrc[1].url} onLoad={() => setShowDropdown(true)} /> : null}
        </div>
        <br></br>
      </div>
      <br></br>
      


        {showDropdown && (
  <div className={`${showDropdown ?'absolute  top-10': 'hidden' }`}>
    <Menu>
      <Menu.Button className="text-gray-500 hover:text-gray-900">
      <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
      </Menu.Button>
      <Menu.Items className="absolute left-0 z-50 w-48 py-2 mt-2 bg-white rounded-md shadow-lg focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
              href="#"
            >
              Download
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
              href="#"
            >
              Download as PNG
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
              href="#"
            >
              Download as PDF
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>  
  </div>
)}
  <div className='flex fixed bottom-10 w-[90%] lg:w-[73%] xl:w-[76.5%]'> 
  <SearchTextbox OnChange={handleChange} Fetch={FetchData} className='fixed flex bottom-4' />   
  </div>
  
      <span className="fixed flex bottom-4 text-gray-900">
        {' '}
        Points utilisés pour la question : {promptTokens}&nbsp;&nbsp;
        {loading && <Loader />}{' '}
      </span>
    </div>

  );
}
