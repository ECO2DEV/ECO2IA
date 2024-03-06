import React, { useState } from 'react';
import Image from 'next/image';
import colombia from '../../public/colombia.png';
import mexico from '../../public/mexico.png';
import argentina from '../../public/argentina.png';
import { DataRegister } from '../../data/register';

const DropDownText = ({ id, libelle, nametx, type, placeholder, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('CL');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getImageSource = (option) => {
    if (option === 'CL') {
      return colombia;
    } else if (option === 'MX') {
      return mexico;
    } else if (option === 'AR') {
      return argentina;
    }
  };

  const handleOptionClick = (optionValue) => {
    setSelectedOption(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="shadow-sm">
      <label htmlFor={id} className="block text-xl font-medium leading-6 text-gray-900 dark:text-white">
        {libelle}
      </label>
      <div className="flex items-center mt-2">
        <div className="relative inline-block text-left mt-2">
          <div className='mr-4'>
            <button
              type="button"
              className="inline-flex items-center justify-center w-full shadow-sm dark:text-white"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded={isOpen ? 'true' : 'false'}
              onClick={toggleDropdown}
            >
              {selectedOption && (
                <Image
                  className="h-5 w-5 inline-block mr-2"
                  src={getImageSource(selectedOption)}
                  alt={selectedOption}
                  width={20}
                  height={20}
                />
              )}
              {selectedOption || DataRegister.CodeRegister}
              <svg
                className={`h-10 w-10 transform ${isOpen ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M6 8l4 4 4-4" />
              </svg>
            </button>
          </div>
          {isOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-darkBgCard dark:text-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="none">
                <button
                  type="button"
                  className="px-4 py-2 text-sm text-black dark:text-white flex items-center"
                  role="menuitem"
                  onClick={() => handleOptionClick('CL')}
                >
                  <Image
                    className="h-5 w-5 inline-block mr-2"
                    src={colombia}
                    alt="Colombia"
                    width={20}
                    height={20}
                  />
                  CL
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm text-black dark:text-white flex items-center"
                  role="menuitem"
                  onClick={() => handleOptionClick('MX')}
                >
                  <Image
                    className="h-5 w-5 inline-block mr-2"
                    src={mexico}
                    alt="Mexico"
                    width={20}
                    height={20}
                  />
                  MX
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm text-black dark:text-white flex items-center"
                  role="menuitem"
                  onClick={() => handleOptionClick('AR')}
                >
                  <Image
                    className="h-5 w-5 inline-block mr-2"
                    src={argentina}
                    alt="Argentina"
                    width={20}
                    height={20}
                  />
                  AR
                </button>
              </div>
            </div>
          )}
        </div>
        <input
          type={type}
          name={nametx}
          id={id}
          className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-emerald-600 dark:focus:border-eco2MainColor focus:outline-none focus:ring-0 focus:border-eco2MainColor peer"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default DropDownText;