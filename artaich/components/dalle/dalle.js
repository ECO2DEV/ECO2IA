import { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import SearchTextbox from '../searchTextbox/searchTextbox';
import axios from 'axios';
import countTokens from '../../util/count_tokens';
import Loader from '../loader/loader';

export default function DalleIA() {
  const [prompt, setPrompt] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [prompTokens, setprompTokens] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const strapiToken = process.env.API_TOKEN;
  const strapiUrl = process.env.STRAPI_URL;

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  const handleChange = (e) => {
    let tokens = countTokens(e.target.value);
    setPrompt(e.target.value);
    setprompTokens(tokens);
  };

  const FetchData = async () => {
    if (!prompt) {
      setError('Please type something before submit');
    } else {
      setIsLoading(true);
      const header = {
        headers: {
          Authorization: `Bearer ${strapiToken}`
        }
      };
      await axios
        .post(`${strapiUrl}/api/openai/dalle`, { prompt: prompt }, header)
        .then((response) => {
          console.log('Response is:');
          console.log(JSON.stringify(response));
          setImageSrc(response.data.data);
        });
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  return (
    <div>
      <br></br>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <img src={imageSrc && imageSrc[0].url} />
        </div>
        <br></br>
        <div style={{ flex: 1 }}>
          {imageSrc ? <img src={imageSrc && imageSrc[1].url} /> : null}
        </div>
        <br></br>
        <div style={{ flex: 1 }}>
          {imageSrc ? <img src={imageSrc && imageSrc[2].url} /> : null}
        </div>
      </div>
      <br></br>
      <div className="relative">
        <img
          src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-hKo4zatnLQOGFJyFSCL9LhU5/user-siiYEBCRytDaLBAH419XYo6s/img-FJfPO29iFhOwDlSqiyNv3J5t.png?st=2023-04-06T00%3A23%3A57Z&se=2023-04-06T02%3A23%3A57Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-05T20%3A50%3A03Z&ske=2023-04-06T20%3A50%3A03Z&sks=b&skv=2021-08-06&sig=tyuoEK436HL/4rI6KYbTlWO/jRzmT2hRTG/DalgDkW8%3D"
          alt="Your image"
          class="w-48 h-48 object-cover"
        />
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
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <a
              href="your-image-url.jpg"
              download
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Download
            </a>
            <a
              href="your-image-url.jpg"
              download
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Download as PNG
            </a>
            <a
              href="your-image-url.jpg"
              download
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Download as PDF
            </a>
          </div>
        </div>
      </div>

      <SearchTextbox OnChange={handleChange} Fetch={FetchData} />
      <span className="fixed flex bottom-4 text-gray-900">
        {' '}
        Points utilisés pour la question : {prompTokens}&nbsp;&nbsp;
        {loading && <Loader />}{' '}
      </span>
    </div>
  );
}
