import { HistoryIconChatGpt } from '../icons/icons';

export default function ButtonHelperHistory({ onClick }) {
  return (
    <button onClick={onClick}>
      <HistoryIconChatGpt />
    </button>
  );
}
