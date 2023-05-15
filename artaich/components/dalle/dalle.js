import { useState, useContext } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import SearchTextbox from '../searchTextbox/searchTextbox';
import { DalleResponse } from '../../util/api/dalleResponse';
import Loader from '../loader/loader';
import ia_chat from '../../public/ia_chat.png';
import Image from 'next/image';

export default function DalleIA() {
  const [showDropdown, setShowDropdown] = useState(false);

  const [imageSrc, setImageSrc] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
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
        const response = await DalleResponse({ prompt: prompt });

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
        <img src="ia_chat.png" alt="Dalle" className="w-40 h-40 object-cover" />

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

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
              <span className="sr-only">Open options</span>
              <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Account settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Support
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      License
                    </a>
                  )}
                </Menu.Item>
                <form method="POST" action="#">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="submit"
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block w-full px-4 py-2 text-left text-sm'
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </form>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div className="flex-fixed bottom-9 ">
        <SearchTextbox OnChange={handleChange} Fetch={FetchData} />
      </div>

      <span className="fixed flex bottom-4 text-gray-900">
        {loading && <Loader />}{' '}
      </span>
    </div>
  );
}
