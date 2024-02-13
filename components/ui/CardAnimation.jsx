
import { motion } from 'framer-motion';

export const CardAnimation = ({ children }) => {
  return (
    <motion.section
      className="bg-slate-800 flex flex-col lg:flex-row lg:justify-between lg:items-center
      rounded-lg p-4 lg:p-0 mx-auto lg:mx-4 xl:mx-auto pt-10 lg:pt-0 sm:max-w-xl md:max-w-screen-sm lg:max-w-screen-xl lg:mx-auto "
      initial={{ x: '-100vw' }} // Comienza fuera de la vista, a la izquierda
      animate={{ x: 0 }} // Termina en la posición original
      transition={{ duration: 1 }}
    >
      {children}
    </motion.section>
  );
};
