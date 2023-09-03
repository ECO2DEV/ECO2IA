import { useState, useEffect } from 'react';
import { BarsIcon, ChevronDown, DeleteCrossIcon } from '../icons/icons';
import CVExperience from './CVExperience';

const ExperienceForm = ({ dropdowns, setDropdowns }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [descriptionResponse, setDescriptionResponse] = useState(null);

  function handleModalOpen() {
    setModalOpen((prev) => !prev);
  }
  const addDropdown = () => {
    setDropdowns([...dropdowns, { isOpen: true, description: [] }]);
  };

  const toggleDropdown = (index) => {
    const updatedDropdowns = [...dropdowns];
    updatedDropdowns[index].isOpen = !updatedDropdowns[index].isOpen;
    setDropdowns(updatedDropdowns);
  };

  const deleteDropdown = (index) => {
    const updatedDropdowns = [...dropdowns];
    updatedDropdowns.splice(index, 1);
    setDropdowns(updatedDropdowns);
  };

  const handleInputChange = (index, field, value) => {
    const updatedDropdowns = [...dropdowns];

    if (field === 'description') {
      // Actualiza el campo description como un array con un solo elemento (la cadena de texto)

      updatedDropdowns[index][field] = [value];
    } else {
      updatedDropdowns[index][field] = value;
    }
    setDropdowns(updatedDropdowns);
  };

  useEffect(() => {
    if (descriptionResponse) {
      const updatedDropdowns = [...dropdowns];
      updatedDropdowns[dropdowns.length - 1].description = descriptionResponse;
      setDropdowns(updatedDropdowns);
    }
  }, [descriptionResponse]);
  // console.log('que hay en dropdowns', dropdowns);

  return (
    <div className="p-4">
      <button
        className="bg-indigo-600 text-white py-2 px-4 rounded mb-4 flex items-center"
        onClick={addDropdown}
      >
        <span className="mr-2">Add Experience</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      {dropdowns.map((dropdown, index) => (
        <div
          key={index}
          className={`bg-white shadow p-4 rounded mb-4 ${
            dropdown.isOpen ? '' : 'h-14 overflow-hidden'
          }`}
        >
          <div className="flex justify-end">
            <button
              className="text-gray-600"
              onClick={() => toggleDropdown(index)}
            >
              {dropdown.isOpen ? <BarsIcon /> : <ChevronDown />}
            </button>
            <button
              className="text-red-600"
              onClick={() => deleteDropdown(index)}
            >
              <DeleteCrossIcon />
            </button>
          </div>
          <div className="mb-4">
            <label
              htmlFor={`jobTitle${index}`}
              className="block text-gray-700 text-sm font-bold mb-2 mt-6"
            >
              Job Title
            </label>
            <input
              id={`jobTitle${index}`}
              className="w-full px-3 py-2 border rounded"
              type="text"
              placeholder="Enter job title"
              value={dropdown.jobTitleXp || ''}
              onChange={(e) =>
                handleInputChange(index, 'jobTitleXp', e.target.value)
              }
            />
          </div>
          <div className="flex">
            <div className="w-1/2 pr-2">
              <label
                htmlFor={`startDate${index}`}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Start Date
              </label>
              <input
                id={`startDate${index}`}
                className="w-full px-3 py-2 border rounded"
                type="text"
                placeholder="Enter start date"
                value={dropdown.startDate || ''}
                onChange={(e) =>
                  handleInputChange(index, 'startDate', e.target.value)
                }
              />
            </div>
            <div className="w-1/2 pl-2">
              <label
                htmlFor={`endDate${index}`}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                End Date
              </label>
              <input
                id={`endDate${index}`}
                className="w-full px-3 py-2 border rounded"
                type="text"
                placeholder="Enter end date"
                value={dropdown.endDate || ''}
                onChange={(e) =>
                  handleInputChange(index, 'endDate', e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex my-4">
            <div className="w-1/2 pr-2">
              <label
                htmlFor={`employer${index}`}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Employer
              </label>
              <input
                id={`employer${index}`}
                className="w-full px-3 py-2 border rounded"
                type="text"
                placeholder="Enter employer"
                value={dropdown.employer || ''}
                onChange={(e) =>
                  handleInputChange(index, 'employer', e.target.value)
                }
              />
            </div>
            <div className="w-1/2 pl-2">
              <label
                htmlFor={`cityXp${index}`}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                City
              </label>
              <input
                id={`cityXp${index}`}
                className="w-full px-3 py-2 border rounded"
                type="text"
                placeholder="Enter city"
                value={dropdown.cityXp || ''}
                onChange={(e) =>
                  handleInputChange(index, 'cityXp', e.target.value)
                }
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor={`description${index}`}
              className="block text-gray-700 text-sm font-bold mb-2 mt-6"
            >
              Description
            </label>
            <textarea
              id={`description${index}`}
              className="w-full h-36 text-xs p-2 border rounded resize-none border focus:border-indigo-600"
              placeholder="Enter job title"
              value={dropdown.description || ''}
              onChange={(e) => {
                handleInputChange(index, 'description', e.target.value);
              }}
            />
          </div>
          <button
            onClick={handleModalOpen}
            className="gap-x-1.5 rounded-md px-3 py-2 mb-2 text-sm font-semibold bg-indigo-600 text-white ring-1 ring-inset ring-gray-30"
          >
            Generate with AI
          </button>
        </div>
      ))}
      {modalOpen && (
        <CVExperience
          onClose={() => handleModalOpen()}
          setDropdowns={setDropdowns}
          setDescriptionResponse={setDescriptionResponse}
        />
      )}
    </div>
  );
};

export default ExperienceForm;
