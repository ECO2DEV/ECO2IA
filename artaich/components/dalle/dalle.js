import { useState, useContext } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import { UserContext } from '../../context/user/UserContext';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import SearchTextbox from '../searchTextbox/searchTextbox';
import { DalleResponse } from '../../util/api/dalleResponse';
import Loader from '../loader/loader';
import ia_chat from '../../public/ia_chat.png';
import Image from 'next/image';
import { Carousel } from './carousel';

export default function DalleIA() {
  const [showDropdown, setShowDropdown] = useState(false);

  const [imageSrc, setImageSrc] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const { user } = useContext(UserContext);
  const { prompt, setPrompt, promptTokens, setPromptTokens, setResponse } =
    useContext(PromptContext);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  const handleChange = (e) => {
    setPrompt(e.target.value);
    if (e.target.value === '') {
      setPromptTokens(0);
    }
  };

  const FetchData = async () => {
    if (!prompt) {
      setIsError('Please type something before submit');
    } else {
      setIsLoading(true);
      try {
        const response = await DalleResponse({ prompt: prompt, user: user });
        setImageSrc(response?.data?.data);
        console.log('response is:', response?.data?.data);
        setResponse(response?.data?.data);
      } catch (error) {
        console.log('error is:', error);
        setIsError('An error occurred while fetching data.');
      } finally {
        setIsLoading(false);
        setPrompt('');
      }
    }
  };

  return (
    <div className="relative">
      <br></br>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <img
            src={imageSrc && imageSrc[0].url}
            onLoad={() => setShowDropdown(true)}
          />
        </div>
        <br></br>
        <div style={{ flex: 1 }}>
          {imageSrc ? (
            <img
              src={imageSrc && imageSrc[1].url}
              onLoad={() => setShowDropdown(true)}
            />
          ) : null}
        </div>
        <br></br>
      </div>
      <br></br>
      <div className="">
        <Carousel />

        {showDropdown && (
          <div className={`${showDropdown ? 'absolute  top-10' : 'hidden'}`}>
            <Menu>
              <Menu.Button className="text-gray-500 hover:text-gray-900">
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
              <Menu.Items className="absolute left-0 z-50 w-48 py-2 mt-2 bg-white rounded-md shadow-lg focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block px-4 py-2 text-sm text-gray-700`}
                      href="#"
                    >
                      Download
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block px-4 py-2 text-sm text-gray-700`}
                      href="#"
                    >
                      Download as PNG
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block px-4 py-2 text-sm text-gray-700`}
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
      </div>

      <div className="flex justify-center fixed bottom-3 w-[92%] lg:w-[72.5%] xl:w-[77%] 2xl:max-w-[77rem]">
        <SearchTextbox
          OnChange={handleChange}
          Fetch={FetchData}
          loading={loading}
        />
      </div>
    </div>
  );
}
