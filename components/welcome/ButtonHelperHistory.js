import { HistoryIconChatGpt } from '../icons/icons';

export default function ButtonHelperHistory({ onClick }) {
  return (
    <button onClick={onClick}>
      <HistoryIconChatGpt className="w-8 h-8 dark:text-lightColor text-darkColor rounded-full" />
    </button>
  );
}
