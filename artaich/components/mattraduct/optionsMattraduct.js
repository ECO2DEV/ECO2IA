import {
  MinusIcon,
  PlusIcon,
  ShareIcon,
  DocumentArrowDownIcon,
  DocumentIcon,
  Cog6ToothIcon
} from '@heroicons/react/20/solid';

export default function OptionsMattraduct({
  showThirdTextarea,
  handleShowThirdTextarea
}) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol
        role="list"
        className="flex space-x-4 rounded-md bg-gray-50 px-6 shadow"
      >
        <li className="flex">
          <div className="flex items-center">
            <a href="#" className="text-gray-500 hover:text-gray-500">
              <Cog6ToothIcon
                className="h-4 w-4 flex-shrink-0 hover:text-gray-800 sm:hover:text-gray-500"
                aria-hidden="true"
              />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        <li className="flex items-center">
          <svg
            className="h-full text-xs w-5 flex-shrink-0 text-gray-200"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <button className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-800">
            <div className="flex justify-center items-center">
              <DocumentArrowDownIcon
                className=" mr-2 h-4 w-4 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                aria-hidden="true"
              />
              <span className="hidden sm:contents">PDF</span>
            </div>
          </button>
        </li>
        <li className="flex items-center">
          <svg
            className="h-full text-xs w-5 flex-shrink-0 text-gray-200"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <button className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-800">
            <div className="flex justify-center items-center">
              <DocumentIcon
                className=" mr-2 h-4 w-4 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                aria-hidden="true"
              />
              <span className="hidden sm:contents">Word</span>
            </div>
          </button>
        </li>
        <li className="flex items-center">
          <svg
            className="h-full text-xs w-5 flex-shrink-0 text-gray-200"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>

          <button className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-800">
            <div className="flex justify-center items-center">
              <ShareIcon
                className=" mr-2 h-4 w-4 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                aria-hidden="true"
              />
              <span className="hidden sm:contents">Share</span>
            </div>
          </button>
        </li>
        <li className="flex items-center">
          <svg
            className="h-full text-xs w-5 flex-shrink-0 text-gray-200"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <button
            onClick={handleShowThirdTextarea}
            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-800"
          >
            {showThirdTextarea ? (
              <div className="flex">
                <MinusIcon
                  className="mr-1 h-5 w-5 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="hidden sm:contents">Language</span>
              </div>
            ) : (
              <div className="flex ">
                <PlusIcon
                  className=" mr-1 h-5 w-5 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="hidden sm:contents">Language</span>
              </div>
            )}
          </button>
        </li>
      </ol>
    </nav>
  );
}
