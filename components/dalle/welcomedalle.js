import { useContext } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import { SunIcon, ZapIcon, WarningIcon } from '../icons/icons';
import {
  DataDalleHelpExample,
  DataDalleHelpCapabilities,
  DataDalleHelpLimitation
} from '../../data/dallehelper';
import { DataEco2Image } from '../../data/eco2image';
export const WelcomeDalle = () => {
  const { setPrompt } = useContext(PromptContext);

  return (
    <div className="md:flex items-start text-center gap-3.5 md:mt-16 xl:mt-24 mt-18 mt-10">
      <div className="flex flex-col mb-2 md:mb-auto gap-3.5 flex-1  ">
        <ul className="flex flex-col gap-1 w-full sm:max-w-md m-auto ">
          <h2 className="mb-2.5 flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2 ">
            <SunIcon /> {DataEco2Image.Example}
          </h2>
          {DataDalleHelpExample.map((DataDalleHelpExample, index) => (
            <button
              key={index}
              onClick={() => setPrompt(DataDalleHelpExample)}
              className="text-xs md:text-base w-full p-1 rounded-md text-gray-50 bg-primary  hover:bg-primaryHover"
            >
              {DataDalleHelpExample} →
            </button>
          ))}
        </ul>
      </div>
      <div className="flex flex-col mb-2 md:mb-auto gap-3.5 flex-1">
        <h2 className="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
          <ZapIcon /> {DataEco2Image.Capabilities}
        </h2>
        <ul className="flex flex-col gap-1 w-full sm:max-w-md m-auto ">
          {DataDalleHelpCapabilities.map((DataDalleHelpCapabilities, index) => (
            <li
              key={index}
              className="text-xs md:text-base w-full p-1 rounded-md text-gray-50 bg-primary"
            >
              {DataDalleHelpCapabilities}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col mb-24 md:mb-auto gap-3.5 flex-1">
        <h2 className="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
          <WarningIcon /> {DataEco2Image.Limitation}
        </h2>
        <ul className="flex flex-col gap-1 w-full sm:max-w-md m-auto ">
          {DataDalleHelpLimitation.map((DataDalleHelpLimitation, index) => (
            <li
              key={index}
              className="text-xs md:text-base w-full p-1 rounded-md text-gray-50 bg-[#]"
            >
              {DataDalleHelpLimitation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
