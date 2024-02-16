import { motion } from "framer-motion";
import Backdrop  from "./Backdrop";




export const FramerModal = ({handleClose, text}) => {
  return (
    <Backdrop onClick={handleClose}>
        <motion.div
          onClick={(e) => e.stopPropagation()}  
          className="modal orange-gradient"
          variants={flip}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
         <ModalText text={text} />
          <ModalButton onClick={handleClose} label="Close" />
        </motion.div>
    </Backdrop>
  );
}


const ModalText = ({ text }) => (
  <div className="text-gray-900 text-base font-bold flex flex-col gap-5 ">
    <h3>{text}</h3>
    <h5>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laboriosam labore, totam
      expedita voluptates tempore asperiores sequi, alias cum veritatis, minima dolor iste similique
      eos id. Porro, culpa? Officiis, placeat?
    </h5>
  </div>
);

const ModalButton = ({ onClick, label }) => (
  <motion.button
    className="modal-button"
    type="button"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {label}
  </motion.button>
);


const dropIn = {
  hidden: {
    y: "-200vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "200vh",
    opacity: 0,
  },
};

const flip = {
  hidden: {
    transform: "scale(0) rotateX(-360deg)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: " scale(1) rotateX(0deg)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: "scale(0) rotateX(360deg)",
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};


const newspaper = {
  hidden: {
    transform: "scale(0) rotate(720deg)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: " scale(1) rotate(0deg)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: "scale(0) rotate(-720deg)",
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};
