<<<<<<< HEAD
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { DataHero } from "../../data/hero";
import Link from "next/link";
export default function Hero({ user }) {
  return (
    <div className="relative isolate px-6 lg:px-8 text-white">
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-sm"></div>
      <div className="mx-auto max-w-3xl py-28 sm:py-46 lg:py-48">
        <div className="text-center sm:mb-8 sm:flex sm:justify-center">
          <p className="text-lg leading-8 text-emerald-500">
=======
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { DataHero } from '../../data/hero';
import Link from 'next/link';
export default function Hero({ user }) {
  return (
    <section className="relative isolate px-6 lg:px-8">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="mx-auto max-w-3xl py-28 sm:py-46 lg:py-48">
        <div className="text-center sm:mb-8 sm:flex sm:justify-center">
          <p className="text-lg leading-8 text-gray-600">
>>>>>>> e4b8f888de9e1a2b112d766cc2c5573bff6475be
            {DataHero.hero_description}
          </p>
        </div>
        <div className="text-center">
<<<<<<< HEAD
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {DataHero.hero_maintext}
          </h1>
          <div className="mt-6 relative rounded-full py-1 px-3 text-sm leading-6 text-white ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            <a href={"/about"} className="font-semibold text-gren-600">
=======
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {DataHero.hero_maintext}
          </h1>
          <div className="mt-6 relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            <a href={'/about'} className="font-semibold text-indigo-600">
>>>>>>> e4b8f888de9e1a2b112d766cc2c5573bff6475be
              <span className="absolute inset-0" aria-hidden="true" />
              {DataHero.hero_readmore}
              <span aria-hidden="true">&rarr;</span>
            </a>
<<<<<<< HEAD
          </div>
          <button className="mx-auto relative border hover:border-emerald-600 duration-500 group cursor-pointer text-sky-50  overflow-hidden h-14 w-56 rounded-md bg-emerald-800 p-2 flex justify-center items-center font-extrabold">
            <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-900 delay-150 group-hover:delay-75"></div>
            <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-800 delay-150 group-hover:delay-100"></div>
            <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-700 delay-150 group-hover:delay-150"></div>
            <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-600 delay-150 group-hover:delay-200"></div>
            <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-500 delay-150 group-hover:delay-300"></div>
            <Link
              href={user ? "/dashboard" : "/auth/signin"}
              className="z-10 bg-transparent"
            >
              {DataHero.hero_getstarted}
            </Link>
          </button>

          {/* <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={user ? "/dashboard" : "/auth/signin"}
              className="rounded-md bg-green px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
            >
              {DataHero.hero_getstarted}
            </Link>
          </div> */}
        </div>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-sm"></div>
    </div>
=======
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={user ? '/dashboard' : '/auth/signin'}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {DataHero.hero_getstarted}
            </Link>
            {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                  {DataHero.hero_learnmore} <span aria-hidden="true">→</span>
                </a> */}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-sm">
        {/* <svg
            className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg> */}
      </div>
    </section>
>>>>>>> e4b8f888de9e1a2b112d766cc2c5573bff6475be
  );
}
