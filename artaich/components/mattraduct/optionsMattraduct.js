import { HomeIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid';

export default function OptionsMattraduct({
  showThirdTextarea,
  handleShowThirdTextarea
}) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol
        role="list"
        className="flex space-x-4 rounded-md bg-white px-6 shadow"
      >
        <li className="flex">
          <div className="flex items-center">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        <li className="flex items-center">
          <svg
            className="h-full w-2 text-xs sm:w-6 flex-shrink-0 text-gray-200"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <button className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
            PDF
          </button>
        </li>
        <li className="flex items-center">
          <svg
            className="h-full w-2 text-xs sm:w-6 flex-shrink-0 text-gray-200"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <button className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
            Word
          </button>
        </li>
        <li className="flex items-center">
          <svg
            className="h-full w-2 text-xs sm:w-6 flex-shrink-0 text-gray-200"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <button className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
            Share
          </button>
        </li>
        <li className="flex items-center">
          <svg
            className="h-full w-2 text-xs sm:w-6 flex-shrink-0 text-gray-200"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <button
            onClick={handleShowThirdTextarea}
            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            {showThirdTextarea ? (
              <div className="flex">
                <MinusIcon
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Language
              </div>
            ) : (
              <div className="flex">
                <PlusIcon
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Language
              </div>
            )}
          </button>
        </li>
      </ol>
    </nav>
  );
}
