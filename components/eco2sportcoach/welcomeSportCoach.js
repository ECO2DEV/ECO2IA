import { useContext } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import { SunIcon, ZapIcon, WarningIcon } from '../icons/icons';
import {
  DataSportHelpExample,
  DataSportHelpCapabilities,
  DataSportHelpLimitation
} from '../../data/sporthelper';

export const WelcomeSportCoach = () => {
  const { setPrompt } = useContext(PromptContext);

  return (
    <div className="md:flex items-start text-center gap-3.5 md:mt-6 xl:mt-6">
      <div className="flex flex-col mb-2 md:mb-auto gap-3.5 flex-1">
        <ul className="flex flex-col gap-1 w-full sm:max-w-md m-auto ">
          <h2 className="mb-2.5 flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2 ">
            <SunIcon /> Pasos
          </h2>
          {DataSportHelpExample.map((DataSportHelpExample, index) => (
            <li
              key={index}
              className="text-xs md:text-base w-full p-1 rounded-md text-gray-50 bg-gray-800  hover:bg-gray-900"
            >
              {DataSportHelpExample} →
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col mb-2 md:mb-auto gap-3.5 flex-1">
        <h2 className="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
          <ZapIcon /> Capacidades
        </h2>
        <ul className="flex flex-col gap-1 w-full sm:max-w-md m-auto ">
          {DataSportHelpCapabilities.map((DataSportHelpCapabilities, index) => (
            <li
              key={index}
              className="text-xs md:text-base w-full p-1 rounded-md text-gray-50 bg-gray-800 "
            >
              {DataSportHelpCapabilities}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col mb-24 md:mb-auto gap-3.5 flex-1">
        <h2 className="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
          <WarningIcon /> Limitaciones
        </h2>
        <ul className="flex flex-col gap-1 w-full sm:max-w-md m-auto ">
          {DataSportHelpLimitation.map((DataSportHelpLimitation, index) => (
            <li
              key={index}
              className="text-xs md:text-base w-full p-1 rounded-md text-gray-50 bg-gray-800"
            >
              {DataSportHelpLimitation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};