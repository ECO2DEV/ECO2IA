import { motion } from "framer-motion";

export const Backdrop = ({ children, onClick }) => {
 
  return (
    <motion.div
      onClick={onClick}
      className="backdrop -z-[100] absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center overflow-y-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
