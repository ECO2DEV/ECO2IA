import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { DataAbout } from '../data/about'
import { aboutheadersection, aboutintroduction,aboutintroductiontext,aboutservice,aboutservicetext,aboutfounded, aboutteam, aboutusers, aboutiaavaibles, aboutnotreplateforme, aboutplateformetext, aboutworldclass, aboutsupportive, aboutlearnign, aboutshareeverything, aboutenjoy, aboutresponsibility, aboutourteam, aboutjoinourteam, aboutsalaries, aboutworkhours, aboutvacation, aboutretreats, aboutbenefits, abourtenvironment, aboutjobpostings } from '../data/about'
import {
  AcademicCapIcon,
  CheckCircleIcon,
  HandRaisedIcon,
  RocketLaunchIcon,
  SparklesIcon,
  SunIcon,
  UserGroupIcon
} from '@heroicons/react/20/solid'

const stats = [


  { label: (DataAbout.aboutfounded), value: '2023' },
  { label: (DataAbout.aboutteam), value: '5+' },
  { label: (DataAbout.aboutusers), value: (DataAbout.aboutusersvalue) },
  { label: (DataAbout.aboutiaavaibles), value: (DataAbout.aboutiaavaiblesvalue) },
]
const values = [
  {
      name: (DataAbout.aboutworldclass),
      description: (DataAbout.aboutworldclassdescription),
      icon: RocketLaunchIcon,
  },
  {
      name: (DataAbout.aboutresponsibility),
      description: (DataAbout.aboutresponsibilitydescription),
      icon: HandRaisedIcon,
  },
  {
      name: (DataAbout.aboutsupportive),
      description: (DataAbout.aboutsupportivedescription),
      icon: UserGroupIcon,
  },
  {
      name: (DataAbout.aboutlearnign),
      description: (DataAbout.aboutlearnigndescription),
      icon: AcademicCapIcon,
  },
  {
      name: (DataAbout.aboutshareeverything),
      description: (DataAbout.aboutshareeverythingdescription),
      icon: SparklesIcon,
  },
  {
      name: (DataAbout.aboutenjoy),
      description: (DataAbout.aboutenjoydescription),
      icon: SunIcon,
  },
]
const team = [
  {
      name: (DataAbout.aboutteam1),
      role: (DataAbout.aboutteam1jobtitle),
      imageUrl:
          'http://localhost:3000/Photo1.jpg',
      imageClass: 'centered-image'    
  },
  {
      name: (DataAbout.aboutteam2),
      role: (DataAbout.aboutteam2jobtitle),
      imageUrl:
          'http://localhost:3000/Photo2.jpg',
      imageClass: 'centered-image'
  },
  {
      name: (DataAbout.aboutteam3),
      role: (DataAbout.aboutteam3jobtitle),
      imageUrl:
          'http://localhost:3000/Photo3.jpg',
  },
  {
      name: (DataAbout.aboutteam4),
      role: (DataAbout.aboutteam4jobtitle),
      imageUrl:
          'http://localhost:3000/Photo4.jpg',
      imageClass: 'centered-image'
  },
  // More people...
]
const benefits = [
  aboutsalaries,
  aboutworkhours,
  aboutvacation,
  aboutretreats,
  aboutbenefits,
  abourtenvironment
]

export default function About() {
  return (
    <div className="bg-gray-900">
      <main className="relative isolate">
        {/* Background */}
        <div
          className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)'
            }}
          />
        </div>

                {/* Header section */}
                <div className="px-6 pt-14 lg:px-8">
                    <div className="mx-auto max-w-2xl pt-24 text-center sm:pt-40">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl"> {DataAbout.aboutheadersection} </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                        </p>
                    </div>
                </div>

        {/* Content section */}
        <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 lg:max-w-none lg:grid-cols-2">
              <div>
                <h3 className="text-3xl font-bold tracking-tight text-white sm:text-3xl">
                  {' '}
                   {DataAbout.aboutintroduction} {' '}
                </h3>
                <br />
                <p>
                {DataAbout.aboutintroductiontext}
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-bold tracking-tight text-white sm:text-3xl">
                  {' '}
                  {DataAbout.aboutservice}
                </h3>
                <br />
                <p>{DataAbout.aboutservicetext}</p>
              </div>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mt-28 lg:grid-cols-4">
              {stats.map((stat, statIdx) => (
                <div
                  key={statIdx}
                  className="flex flex-col-reverse gap-y-3 border-l border-white/20 pl-6"
                >
                  <dt className="text-base leading-7 text-gray-300">
                    {stat.label}
                  </dt>
                  <dd className="text-3xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Image section */}
        <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
          <img
            src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2894&q=80"
            alt=""
            className="aspect-[9/4] w-full object-cover xl:rounded-3xl"
          />
        </div>

        {/* Values section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {' '}
              {DataAbout.aboutnotreplateforme}{' '}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {DataAbout.aboutplateformetext}
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
            {values.map((value) => (
              <div key={value.name} className="relative pl-9">
                <dt className="inline font-semibold text-white">
                  <value.icon
                    className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                    aria-hidden="true"
                  />
                  {value.name}
                </dt>{' '}
                <dd className="inline">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Team section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {' '}
              {DataAbout.aboutourteam}{' '}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {DataAbout.aboutourteamdescription}
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
          >
            {team.map((person) => (
              <li key={person.name}>
                <img
                  className="aspect-[10/14] w-full rounded-2xl object-cover"
                  src={person.imageUrl}
                  alt=""
                />
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">
                  {person.name}
                </h3>
                <p className="text-base leading-7 text-gray-300">
                  {person.role}
                </p>
                <p className="text-sm leading-6 text-gray-500">
                  {person.location}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA section */}
      </main>
    </div>
  )
}
