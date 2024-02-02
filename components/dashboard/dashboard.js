import Link from 'next/link';
import Image from 'next/image';

import { DataDashboard } from '../../data/dashboard';

import mattchat from '../../public/mattchat.png'
import mattresume from '../../public/mattresume.png'
import mattimage from '../../public/mattimage.png'
import mattrad from '../../public/mattrad.png'
import mattsport from '../../public/mattsport.png'
import mattquiz from '../../public/mattquiz.png'
import mattdesc from '../../public/mattdesc.png'
import mattcv from '../../public/mattcv.png'

const actions = [
  {
    title: DataDashboard.MattechChatTitle,
    href: 'mattchat',
    description: DataDashboard.MattechChatDescription,
    icon: mattchat,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50'
  },
  {
    title: DataDashboard.MattechImageTitle,
    href: 'mattimage',
    description: DataDashboard.MattechImageDescription,
    icon: mattimage,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.MatTranslateTitle,
    href: 'mattraduct',
    description: DataDashboard.MatTranslateDescription,
    icon: mattrad,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.MattSportTitle,
    href: 'mattsport',
    description: DataDashboard.MattSportDescription,
    icon: mattsport,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.MattQuizTitle,
    href: 'matquiz',
    description: DataDashboard.MattQuizDescription,
    icon: mattquiz,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.MattDescriptionTitle,
    href: 'matdescription',
    description: DataDashboard.MattDescription,
    icon: mattdesc,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.MattResumeTitle,
    href: 'mattresum',
    description: DataDashboard.MattResume,
    icon: mattresume,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.MatCVTitle,
    href: 'matcv',
    description: DataDashboard.MatCVDescription,
    icon: mattcv,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  }
  // {
  //   title: 'Schedule a one-on-one',
  //   href: '#',
  //   icon: UsersIcon,
  //   iconForeground: 'text-sky-700',
  //   iconBackground: 'bg-sky-50',
  // },
  // {
  //   title: 'Payroll',
  //   href: '#',
  //   icon: BanknotesIcon,
  //   iconForeground: 'text-yellow-700',
  //   iconBackground: 'bg-yellow-50',
  // },
  // {
  //   title: 'Submit an expense',
  //   href: '#',
  //   icon: ReceiptRefundIcon,
  //   iconForeground: 'text-rose-700',
  //   iconBackground: 'bg-rose-50',
  // },
  // {
  //   title: 'Training',
  //   href: '#',
  //   icon: AcademicCapIcon,
  //   iconForeground: 'text-indigo-700',
  //   iconBackground: 'bg-indigo-50',
  // },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DashboardSection() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        <h1 className="text-2xl text-center font-semibolds">
          {DataDashboard.DashboardTitle}
        </h1>
      </div>

      <div className="overflow-hidden rounded-lg shadow grid sm:grid-cols-2 gap-y-4 gap-x-4">
        {actions.map((action, actionIdx) => (
          <div
            key={action.title}
            className={classNames(
              actionIdx === 0
                ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                : '',
              actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
              actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
              actionIdx === actions.length - 1
                ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                : '',
              'group bg-[#21c284] relative p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500 gap-6'
            )}
          >
            <div>
              <span
                className={classNames(
                  action.iconBackground,
                  action.iconForeground,
                  'inline-flex rounded-lg p-1 ring-4 ring-white'
                )}
              >
                <Image
                  className="h-12 w-12"
                  src={action.icon}
                  alt={action.title}
                />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-base font-semibold leading-6">
                <Link href={action.href} className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  {action.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-gray-600">{action.description}</p>
            </div>
            <span
              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
