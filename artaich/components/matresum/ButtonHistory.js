import { HistoryIcon } from "../icons/icons";

export const ButtonHistory = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <HistoryIcon />
    </button>
  );
};