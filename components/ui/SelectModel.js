import { useState } from 'react';
import Image from 'next/image';

export const SelectModel = ({ modelOptions, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(modelOptions[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="custom-select-wrapper ">
      <div
        className={`custom-select ${isOpen ? 'open' : ''}`}
        tabIndex={0}
        onClick={toggleDropdown}
      >
        {' '}
        <div className="custom-select__trigger">
          <span className="text-black text-sm font-thin">
            {selectedOption.label}
          </span>
          <Image
            className="icon"
            src={selectedOption.icon}
            alt="icono"
            height={20}
            width={20}
          />
        </div>
        {isOpen && (
          <div className="custom-options">
            {' '}
            {modelOptions.map((option) => (
              <div
                key={option.value}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option);
                }}
                className={`custom-option ${
                  selectedOption.value === option.value ? 'selected' : ''
                }`}
              >
                {/* {option.icon} */}
                {option && (
                  <div className="flex justify-between">
                    <span className="text-black">{option.label}</span>
                    <Image
                      className="icon"
                      src={option.icon}
                      alt="icono"
                      height={20}
                      width={20}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
