import { Fragment, useState, useContext, useEffect } from 'react';

import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import { PromptContext } from '../../context/prompts/PromptContext';
import { UserContext } from '../../context/user/UserContext';
import { navigation, modelOptions } from '../../constants/constans';
import {
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import logo from '../../public/Mlogop.png';
import { strapiUrl } from '../../constants/constans';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { DataLayout } from '../../data/layout';
import LanguageDropdown from './LanguageDropdown';
import { ButtonHelper } from '../welcome/buttonHelper';
import ButtonHelperHistory from '../welcome/ButtonHelperHistory';
import { SelectModel } from '../ui/SelectModel';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function LayoutUser({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [discountTokensModal, setDiscountTokensModal] = useState(0);
  const router = useRouter();
  const image_url = children?.props?.user?.avatar
    ? strapiUrl + children.props.user.avatar.url
    : '/empty_avatar.png';

  const currentPath = useRouter().pathname; // Obtener la ruta actual

  const shouldShowTopNavBar = [
    '/mattchat',
    '/mattimage',
    '/mattraduct',
    '/mattsport',
    '/matquiz',
    '/matdescription',
    '/mattresum',
    '/matcv',
    '/dashboard'
  ].includes(currentPath);
  // console.log('Image_url' + children.props.user.avatar);

  const {
    setPlan,
    plan,
    promptTokens,
    responseTokens,
    response,
    setPromptTokens,
    setResponseTokens,
    activeAI
  } = useContext(PromptContext);

  const { max_imagens = 0, max_tokens = 0 } = plan;

  const {
    setUser,
    openHelpers,
    modalOpen,
    setOpenHelpers,
    setModalOpen,
    setSelectedModel
  } = useContext(UserContext);

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  useEffect(() => {
    if (!children?.props?.user?.plan) return;
    setPlan(children.props.user.plan ? children.props.user.plan.id : null);
  }, []);

  useEffect(() => {
    if (!children?.props?.user) return;
    setUser(children?.props?.user);
  }, [children?.props?.user]);

  // const { attributes } = plan;
  // console.log(JSON.stringify(children.props.user));

  // useEffect for discountTokensModal
  useEffect(() => {
    setDiscountTokensModal(promptTokens + responseTokens);
    if (response && (activeAI === 'ChatGPT' || activeAI === 'DalleIA')) {
      setTimeout(() => {
        setDiscountTokensModal(0);
      }, 2000);
    }
  }, [response, responseTokens, activeAI]);
  // useEffect for start counting the tokens in 0, after the next response
  useEffect(() => {
    setTimeout(() => {
      if (
        activeAI === 'ChatGPT' ||
        activeAI === 'DalleIA' ||
        activeAI === 'MatquizAI'
      ) {
        setPromptTokens(0);
      }
      setResponseTokens(0);
      setDiscountTokensModal(0);
    }, 3000);
  }, [response, responseTokens]);

  return (
    <>
      {/* Removing the scroll for let chatGpt to scroll with his own scrollbar (overflow-y-hidden h-screen)*/}
      <div className='bg-[#000000]'>
        {/* Sideba. When is in mobile version and the hamburguer menu button is been clicked*/}
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="aside"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">
                          {DataLayout.CloseSidebar}
                        </span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex items-center justify-center">
                      <div className="flex flex-shrink-0 px-4">
                        <Image
                          className="h-12 w-auto cursor-pointer"
                          src={logo}
                          alt="Mattech"
                          onClick={() => router.push('/')}
                        />
                      </div>
                    </div>
                  </div>
                  <nav className="mt-5 flex-1 space-y-1 px-2">
                    <Link
                      href="/dashboard"
                      className={classNames(
                        'bg-gray-900 text-white',
                        'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                      )}
                    >
                      <HomeIcon
                        className={classNames(
                          'text-gray-300',
                          'mr-3 h-6 w-6 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {DataLayout.Dashboard}
                    </Link>
                  </nav>
                  {/* Este es el counter para pantallas pequeñas */}
                  <div className="flex flex-shrink-0 p-4">
                    <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12">
                      <div className="relative flex flex-col-reverse gap-y-3 border-l border-white/20 pl-6">
                        <dt className="text-sm lg:text-xs leading-3 text-gray-300 z-10">
                          {DataLayout.Words}
                        </dt>
                        {discountTokensModal > 0 && (
                          <span className="text-red-500 text-1xl absolute top-0 -mt-7 right-4 z-0">
                            -{discountTokensModal}
                          </span>
                        )}
                        <dd className="text-base font-semibold tracking-tight text-white">
                          {max_tokens}
                        </dd>
                      </div>
                      <div className="flex flex-col-reverse gap-y-3 border-l border-white/20 pl-6">
                        <dt className="text-sm lg:text-xs leading-3 text-gray-300">
                          {DataLayout.Images}
                        </dt>
                        <dd className="text-base font-semibold tracking-tight text-white">
                          {max_imagens}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-shrink-0 bg-gray-700 p-4">
                    <div className="flex items-center">
                      <div>
                        {image_url ? (
                          <img
                            className="inline-block h-9 w-9 rounded-full"
                            src={image_url}
                            alt={children?.props?.user?.username}
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-white bg-gray-400 rounded-full">
                            <span className="text-lg font-semibold">
                              {children.props.user.username.charAt(0)}
                              {children.props.user.username.charAt(1)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-white">
                          {children?.props?.user?.Name}
                        </p>
                        <Link href={'/profile'}>
                          <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
                            {DataLayout.Profile}
                          </p>
                        </Link>
                      </div>
                    </div>
                    <div className="flex-row-reverse ml-8 items-center">
                      <button
                        title="Click for Logout!"
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => signOut()}
                      >
                        <ArrowLeftOnRectangleIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}

          <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 self-center px-4">
                <Link href="/">
                  <Image className="h-12 w-auto" src={logo} alt="Mattech" />
                </Link>
              </div>
              <nav className="mt-5 flex-1 space-y-1 px-2">
                <Link
                  href="/dashboard"
                  className={classNames(
                    'bg-gray-900 text-white',
                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                  )}
                >
                  <HomeIcon
                    className={classNames(
                      'text-gray-300',
                      'mr-3 h-6 w-6 flex-shrink-0'
                    )}
                    aria-hidden="true"
                  />
                  {DataLayout.Dashboard}
                </Link>
              </nav>
            </div>
            <div className="flex flex-shrink-0 p-4">
              <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12">
                <div className="relative flex flex-col-reverse gap-y-3 border-l border-white/20 pl-6 ">
                  <dt className="text-sm lg:text-xs leading-3 text-gray-300 z-10">
                    {DataLayout.Words}
                  </dt>
                  {discountTokensModal > 0 && (
                    <span className="text-red-500 text-1xl absolute top-0 -mt-7 right-1 z-0">
                      -{discountTokensModal}
                    </span>
                  )}
                  <dd className="text-base font-semibold tracking-tight text-white">
                    {max_tokens}
                  </dd>
                </div>
                <div className="flex flex-col-reverse gap-y-3 border-l border-white/20 pl-6">
                  <dt className="text-sm lg:text-xs leading-3 text-gray-300">
                    {DataLayout.Images}
                  </dt>
                  <dd className="text-base font-semibold tracking-tight text-white">
                    {max_imagens}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="flex flex-shrink-0 bg-gray-700 p-4">
              <div className="flex items-center">
                <div>
                  {image_url ? (
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src={image_url}
                      alt={children?.props?.user?.username}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-white bg-gray-400 rounded-full">
                      <span className="text-lg font-semibold">
                        {children.props.user.username.charAt(0)}
                        {children.props.user.username.charAt(1)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    {children?.props?.user?.username}
                  </p>
                  <Link href={'/profile'}>
                    <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
                      {DataLayout.Profile}
                    </p>
                  </Link>
                </div>
              </div>
              <div className="flex-row-reverse ml-8 items-center">
                <button
                  title="Click for Logout !"
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  <ArrowLeftOnRectangleIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3  border-b border-gray-300">
            {shouldShowTopNavBar && (
              <div className="mb-1 flex justify-between">
                <div className="flex items-center">
                  <button
                    type="button"
                    className=" inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <span className="sr-only">{DataLayout.OpenSidebar}</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <h2 className="text-gray-500 text-2xl ">
                    {navigation.find((item) => item.href === currentPath)
                      ?.name || ''}
                  </h2>
                </div>

                {currentPath === '/matcv' ? (
                  <LanguageDropdown />
                ) : currentPath === '/mattchat' ? (
                  <div className="flex md:hidden justify-between items-center gap-2">
                    <ButtonHelper
                      onClick={() => setOpenHelpers(!openHelpers)}
                    />
                    <ButtonHelperHistory
                      onClick={() => setModalOpen(!modalOpen)}
                    />
                    <SelectModel
                      modelOptions={modelOptions}
                      onChange={handleModelChange}
                    />
                  </div>
                ) : null}
              </div>
            )}
          </div>
          <main className="flex-1">
            <div className="lg:py-3 h-screen">
              <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
      <Toaster position="top-center" />
    </>
  );
}