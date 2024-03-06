// components/SportCoach_Helper/SportCoach_Helper.js
import { QuestionIcon } from '../icons/icons';

export const SportButtonHelper = ({ onClick }) => {
  const handleClick = () => {
    onClick();
  };
  return (
    <>
      <button className="mt-4 ml-4" onClick={handleClick}>
        <QuestionIcon className="w-10 h-10" />
      </button>
      {/* <span className="relative flex h-3 w-3 mt-6">
        <span className="animate-ping absolute right-2 inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
        <span className="relative right-2 inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
      </span> */}
    </>
  );
};
