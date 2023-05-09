import { QuestionIcon } from '../icons/icons';

export const ButtonHelper = ({ onClick }) => {
  return (
    <button className="my-auto" onClick={onClick}>
      <QuestionIcon />
    </button>
  );
};
