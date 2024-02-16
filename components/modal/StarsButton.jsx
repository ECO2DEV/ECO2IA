import { motion } from "framer-motion";

export const StarsButton = ({isModalOpen,setIsModalOpen}) => {

  const close = () => setIsModalOpen(false);
  const open = () => setIsModalOpen(true);

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className=""
        onClick={() => (isModalOpen ? close() : open())}
      >
        🌟🌟🌟🌟🌟
      </motion.button>
    </div>
 )
}
