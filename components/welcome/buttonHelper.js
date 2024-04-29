import { QuestionIcon } from '../icons/icons';
import { motion } from 'framer-motion';

export const ButtonHelper = ({ onClick }) => {
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Ver algunas sugerencias de preguntas 🤔"
        className=" ml-4"
        onClick={onClick}
      >
        <QuestionIcon className="w-8 h-8 dark:text-darkColor text-lightColor bg-darkColor dark:bg-lightColor rounded-full " />
      </motion.button>

      {/* <span className="relative flex h-3 w-3 mt-6">
        <span className="animate-ping absolute right-2 inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
        <span className="relative right-2 inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
      </span> */}
    </>
  );
};
