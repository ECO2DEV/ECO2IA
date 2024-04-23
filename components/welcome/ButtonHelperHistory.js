import { HistoryIconChatGpt } from '../icons/icons';
import { motion } from 'framer-motion';

export default function ButtonHelperHistory({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title="Ver historial de conversaciones 📜"
    >
      <HistoryIconChatGpt className="w-8 h-8 dark:text-darkColor text-lightColor bg-darkColor dark:bg-lightColor rounded-full" />
    </motion.button>
  );
}
