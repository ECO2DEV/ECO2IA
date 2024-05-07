import { LatestImages } from '../icons/icons';

export const ButtonLatestImg = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      title="Últimas imágenes"
      className="hover:scale-110 transition-transform duration-200"
    >
      <LatestImages />
    </button>
  );
};
