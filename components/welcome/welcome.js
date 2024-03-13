import { SunIcon, ZapIcon, WarningIcon } from '../icons/icons';
import { EXAMPLES, CAPABILITIES, LIMITATION } from '../../data/helpers';
import { DataEco2Chat } from '../../data/eco2chat';
export const Welcome = ({ setInput }) => {
  return (
    <div className="md:flex items-start text-center gap-3.5 md:mt-16 xl:mt-24">
      <div className="flex flex-col justify-center items-center mb-2 md:mb-auto gap-3.5 flex-1">
        <ul className="flex flex-col justify-center items-center gap-1 w-full sm:max-w-md m-auto ">
          <h2 className="mb-2.5 flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2 ">
            <SunIcon /> {DataEco2Chat.Example}
          </h2>
          {EXAMPLES.map((example, index) => (
            <button
              key={index}
              onClick={() => setInput(example)}
              className="text-xs md:text-base w-full p-1 rounded-md text-gray-50 bg-eco2MainColor  hover:bg-eco2HoverColor"
            >
              {example} →
            </button>
          ))}
        </ul>
      </div>
      <div className="flex flex-col justify-center items-center mb-2 md:mb-auto gap-3.5 flex-1">
        <h2 className="flex justify-center items-center gap-3 m-auto text-lg font-normal md:flex-col md:gap-2">
          <ZapIcon /> {DataEco2Chat.Capabilities}
        </h2>
        <ul className="flex flex-col justify-center items-center gap-1 w-full sm:max-w-md m-auto ">
          {CAPABILITIES.map((capability, index) => (
            <li
              key={index}
              className="text-xs md:text-base w-full p-1 rounded-md text-gray-50 bg-eco2MainColor"
            >
              {capability}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col justify-center items-center mb-24 md:mb-auto gap-3.5 flex-1">
        <h2 className="flex justify-center flex-col justify-center  items-center gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
          <WarningIcon /> {DataEco2Chat.Limitation}
        </h2>
        <ul className="flex flex-col flex-col justify-center items-center gap-1 w-full sm:max-w-md m-auto ">
          {LIMITATION.map((limitation, index) => (
            <li
              key={index}
              className="text-xs md:text-base w-full p-1 rounded-md text-gray-50 bg-eco2MainColor"
            >
              {limitation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
