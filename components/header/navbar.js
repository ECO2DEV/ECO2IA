import { useState } from 'react';
import { Dialog, Disclosure, Popover } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { signIn } from 'next-auth/react';
import { DataNavbar } from '../../data/navbar';
import { products, callsToAction } from '../../data/navbar';
import logo from '../../public/Mlogop.webp';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header({ router, user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router2 = useRouter();

  const handleRedirectToDashboard = () => {
    router2.push('/dashboard');
  };
  return (
    <div className="">
      <header
        className={
          router != ''
            ? 'fixed inset-x-0 top-0 z-50'
            : 'absolute inset-x-0 top-0 z-50'
        }
      >
        <nav
          className="mx-auto flex max-w-7xl items-center mt-4 bg-[#10b981] rounded-3xl p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href={'/'} legacyBehavior>
              <a className="-m-1.5 p-1.5">
                <span className="sr-only text-xl">
                  {DataNavbar.COMPANY_NAME}
                </span>
                <Image className="h-8 w-auto" src={logo} alt="Mattech" />
              </a>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Ouvrir Menu principal</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <a
              href="/nosia"
              className="text-xl font-semibold leading-6 text-white"
            >
              {DataNavbar.menu_opt_2}
            </a>
            <a
              href="/#pricing"
              className="text-xl font-semibold leading-6 text-white"
            >
              {DataNavbar.menu_opt_3}
            </a>
            <Link href={'/about'} legacyBehavior>
              <a className="text-xl font-semibold leading-6 text-white">
                {DataNavbar.menu_opt_4}
              </a>
            </Link>
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button
              className="text-xl font-semibold leading-6 text-white"
              onClick={user ? handleRedirectToDashboard : () => signIn()}
            >
              {DataNavbar.login_option} <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10 bg-black" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between bg-black">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Mattech</span>
                <Image className="h-8 w-auto" src={logo} alt="Mattech" />
              </a>
              <button
                type="button"
                className=" -m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Fermer Menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root ">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...products, ...callsToAction].map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              <ChevronDownIcon
                                className={classNames(
                                  open ? 'rotate-180' : '',
                                  'h-5 w-5 flex-none'
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Link
                    href="/nosia"
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {DataNavbar.menu_opt_2}
                  </Link>
                  <Link
                    href="/"
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {DataNavbar.menu_opt_3}
                  </Link>
                  <Link href={'/about'} legacyBehavior>
                    <a className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      {DataNavbar.menu_opt_4}
                    </a>
                  </Link>
                </div>
                <div className="py-6">
                  <button
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={user ? handleRedirectToDashboard : () => signIn()}
                  >
                    {DataNavbar.login_option}
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}
