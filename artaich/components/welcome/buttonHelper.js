import { QuestionIcon } from '../icons/icons';

export const ButtonHelper = ({ onClick }) => {
  return (
    <>
      <button className="mt-4 ml-4 " onClick={onClick}>
        <QuestionIcon />
      </button>
      {/* <span className="relative flex h-3 w-3 mt-6">
        <span className="animate-ping absolute right-2 inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
        <span className="relative right-2 inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
      </span> */}
    </>
  );
};
