import { LatestImages } from '../icons/icons';

export const ButtonLatestImg = ({ onClick }) => {
  return (
    <button onClick={onClick} title='Historique'>
      <LatestImages />
    </button>
  );
};
