import { useContext } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import {
  ClipboardIcon,
  DeleteIconWhite,
  MagicAiIcon,
  VolumenSpeakerIcon
} from '../icons/icons';
import { twMerge } from 'tailwind-merge';
import Loader from '../loader/loader';
import { DataEco2Traduct } from '../../data/eco2traduct';

const getPlaceholder = ({ type, loading }) => {
  if (type === 'from') return DataEco2Traduct.TextArea1;
  if (loading === true) return DataEco2Traduct.TextAreaLoading;
  return DataEco2Traduct.TextArea2;
};

export const TextArea = ({
  type,
  loading,
  value,
  onChange,
  fetchLoading = false,
  onClick = () => {},
  onHandleTraduct = () => {},
  handlePlayAudio = () => {}
}) => {
  const { setPrompt, setPromptTokens } = useContext(PromptContext);
  const onHandleClean = () => {
    onChange('');
    setPrompt('');
    setPromptTokens(0);
  };
  const handleChange = (event) => {
    onChange(event.target.value);
    if (event.target.value === '') {
      setPromptTokens(0);
    }
    setPrompt(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default Enter behavior (new line)
      onHandleTraduct(); // Execute translation function
    }
  };

  return (
    <div className="relative w-full">
      <textarea
        onKeyDown={handleKeyDown}
        autoFocus={type === 'from'}
        disabled={type === 'to'}
        placeholder={getPlaceholder({ type, loading })}
        className={` pl-1 border-0 resize-none rounded-b-md custom-input ${
          type === 'from' ? 'bg-darkBgCard' : 'border-gray-200'
        }
      ${
        type === 'from'
          ? 'h-[200px] sm:h-[300px] lg:h-[400px] xl:h-[410px] w-full bg-darkBgCard dark:bg-darkBgCard font-semibold text-gray-200 dark:text-gray-200 '
          : 'h-[200px]  sm:h-[300px] lg:h-[400px] xl:h-[410px] w-full bg-white font-semibold text-gray-800'
      }`}
        value={value}
        onChange={handleChange}
      />

      {type === 'to' && (
        <button
          className="absolute bottom-2 right-2 focus:outline-none"
          onClick={onClick}
        >
          <ClipboardIcon />
        </button>
      )}
      {type === 'to' && (
        <button
          className="absolute bottom-3 right-9 focus:outline-none"
          onClick={handlePlayAudio}
        >
          <VolumenSpeakerIcon />
        </button>
      )}
      {type === 'from' && (
        <>
          <button
            title="Eliminar texto"
            className="absolute bottom-2 right-10 focus:outline-none"
            onClick={onHandleClean}
          >
            <DeleteIconWhite />
          </button>
          <button
            title="Traducir"
            className={twMerge(
              'absolute focus:outline-none hover:text-eco2MainColor ',
              fetchLoading ? 'bottom-3 right-1' : 'bottom-3 right-3'
            )}
            onClick={onHandleTraduct}
          >
            {fetchLoading ? (
              <div className="ml-2">
                <Loader />
              </div>
            ) : (
              <MagicAiIcon className="icon-sm shrink-0 text-white hover:text-eco2MainColor transition-colors duration-500 ease-in-out " />
            )}
          </button>
        </>
      )}
    </div>
  );
};
