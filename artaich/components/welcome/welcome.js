import { useContext } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import { SunIcon, ZapIcon, WarningIcon } from '../icons/icons';
const EXAMPLES = [
  '¿Cómo iterar un array en JavaScript?',
  'Explícame cómo funciona un coche',
  '¿Por qué se dice que un gato tiene 7 vidas?'
];

const CAPABILITIES = [
  '¿Cómo puedo ayudarte?',
  '¿Qué puedo hacer por ti?',
  '¿Qué necesitas?'
];

const LIMITATION = [
  'No puedo hacerlo todo, pero puedo ayudarte con lo siguiente:',
  'No puedo hacerlo todo, pero puedo ayudarte con lo siguiente:',
  'No puedo hacerlo todo, pero puedo ayudarte con lo siguiente:'
];

export const Welcome = () => {
  const { setPrompt } = useContext(PromptContext);

  return (
    <div className="md:flex items-start text-center gap-3.5">
      <div className="flex flex-col mb-2 md:mb-auto gap-3.5 flex-1">
        <ul className="flex flex-col gap-1 w-full sm:max-w-md m-auto ">
          <h2 className="mb-2.5 flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2 ">
            <SunIcon /> Example
          </h2>
          {EXAMPLES.map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              className="text-xs md:text-base w-full p-1 rounded-md text-gray-50 bg-gray-700  hover:bg-gray-900"
            >
              {example} →
            </button>
          ))}
        </ul>
      </div>
      <div className="flex flex-col mb-2 md:mb-auto gap-3.5 flex-1">
        <h2 className="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
          <ZapIcon /> Capabilities
        </h2>
        <ul className="flex flex-col gap-1 w-full sm:max-w-md m-auto ">
          {CAPABILITIES.map((capability, index) => (
            <li
              key={index}
              className="text-xs md:text-base w-full p-1 rounded-md text-gray-50 bg-gray-700 "
            >
              {capability}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col mb-24 md:mb-auto gap-3.5 flex-1">
        <h2 className="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
          <WarningIcon /> Limitations
        </h2>
        <ul className="flex flex-col gap-1 w-full sm:max-w-md m-auto ">
          {LIMITATION.map((limitation, index) => (
            <li
              key={index}
              className="text-xs md:text-base w-full p-1 rounded-md text-gray-50 bg-gray-700"
            >
              {limitation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};