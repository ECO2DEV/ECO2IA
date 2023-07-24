import { useEffect } from 'react';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import CVExperience from './CVExperience';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function Dropdown({
  formExperienceFields,
  setFormExperienceFields,
  textExperience,
  setTextExperience,
  modalOpen,
  setModalOpen
}) {
  const handleGenerateClick = (event) => {
    event.stopPropagation();
    setModalOpen(true);
  };

  useEffect(() => {
    const closeModalOnOutsideClick = (event) => {
      if (!event.target.closest('.cv-experience-modal')) {
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.addEventListener('click', closeModalOnOutsideClick);
    }

    return () => {
      document.removeEventListener('click', closeModalOnOutsideClick);
    };
  }, [modalOpen]);

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormExperienceFields((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Popover className="relative w-full mb-5">
      <Popover.Button className="flex items-center gap-x-1 text-base font-bold leading-6 text-gray-700">
        <span>Add Experience</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-4 flex items-start w-screen max-w-max -translate-x-1/2">
          <div className="w-screen max-w-md flex-auto overflow-hidden  text-sm leading-6">
            <input
              type="text"
              name="jobTitleXp"
              value={formExperienceFields.jobTitleXp}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-2 border rounded-md text-sm text-gray-800 focus:ring-indigo-500"
              placeholder="Job Title"
            />
            <input
              type="text"
              name="employer"
              value={formExperienceFields.employer}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-2 border rounded-md text-sm text-gray-800  focus:ring-indigo-500"
              placeholder="Employer"
            />
            <input
              type="text"
              name="startDate"
              value={formExperienceFields.startDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-2 border rounded-md text-sm text-gray-800  focus:ring-indigo-500"
              placeholder="Start Date"
            />
            <input
              type="text"
              name="endDate"
              value={formExperienceFields.endDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-2 border rounded-md text-sm text-gray-800  focus:ring-indigo-500"
              placeholder="End Date"
            />
            <input
              type="text"
              name="cityXp"
              value={formExperienceFields.cityXp}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-2 border rounded-md text-sm text-gray-800 "
              placeholder="City"
            />
            <form>
              <textarea
                placeholder="Showcase your professional expertise through concise bullet points, emphasizing your notable achievements..."
                value={textExperience ? textExperience : ''}
                onChange={(e) => setTextExperience(e.target.value)}
                className="w-full h-36 text-xs p-2 border rounded resize-none border focus:border-indigo-600"
              ></textarea>
            </form>
            <button
              onClick={handleGenerateClick}
              className="gap-x-1.5 rounded-md px-3 py-2 mb-2 text-sm font-semibold bg-indigo-600 text-white ring-1 ring-inset ring-gray-30"
            >
              Generate with AI🤖
            </button>
          </div>
        </Popover.Panel>
      </Transition>

      {/* The CVExperience modal */}
      {modalOpen && (
        <div
          className="cv-experience-modal"
          onClick={(event) => event.stopPropagation()}
        >
          <CVExperience
            onClose={handleModalClose}
            setTextExperience={setTextExperience}
          />
        </div>
      )}
    </Popover>
  );
}
