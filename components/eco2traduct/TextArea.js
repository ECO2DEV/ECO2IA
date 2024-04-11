import { useContext } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import {
  ClipboardIcon,
  DeleteIconWhite,
  SendIcon,
  VolumenSpeakerIcon
} from '../icons/icons';
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

  return (
    <div className="relative w-full">
      <textarea
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
            className="absolute bottom-2 right-10 focus:outline-none"
            onClick={onHandleClean}
          >
            <DeleteIconWhite />
          </button>
          <button
            className="absolute bottom-2 right-1 focus:outline-none"
            onClick={onHandleTraduct}
          >
            {fetchLoading ? (
              <div className="mb-1">
                <Loader />
              </div>
            ) : (
              <SendIcon />
            )}
          </button>
        </>
      )}
    </div>
  );
};
