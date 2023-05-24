import { LatestImages } from '../icons/icons';

export const ButtonLatestImg = ({ onClick }) => {
  return (
    <button className="mt-4 ml-4 " onClick={onClick}>
      <LatestImages />
    </button>
  );
};
