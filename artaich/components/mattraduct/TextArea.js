import { useContext } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import { ClipboardIcon, SendIcon } from '../icons/icons';
import Loader from '../loader/loader';
import { DataMatTraduct } from '../../data/mattraduct';


const getPlaceholder = ({ type, loading }) => {
  if (type === 'from') return (DataMatTraduct.TextArea1);
  if (loading === true) return (DataMatTraduct.TextAreaLoading);
  return (DataMatTraduct.TextArea2);
};

export const TextArea = ({
  type,
  loading,
  value,
  onChange,
  fetchLoading = false,
  onClick = () => {},
  onHandleTraduct = () => {}
}) => {
  

  const { setPrompt, setPromptTokens } = useContext(PromptContext);
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
        className={` pl-1 border-0 resize-none rounded-b-md ${
          type === 'from' ? '' : 'border-gray-200'
        }
      ${
        type === 'from'
          ? 'h-[200px] sm:h-[300px] lg:h-[400px] xl:h-[410px] w-full bg-gray-800 text-gray-100'
          : 'h-[200px]  sm:h-[300px] lg:h-[400px] xl:h-[410px] w-full bg-gray-200'
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
      {type === 'from' && (
        <button
          className="absolute bottom-2 right-2 focus:outline-none"
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
      )}
    </div>
  );
};
