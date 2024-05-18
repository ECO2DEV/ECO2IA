import { useState, useContext } from "react";
import {UserContext} from "../../context/user/UserContext";
import { motion } from "framer-motion";
import Backdrop  from "./Backdrop";
import { StarsRate } from "../ui/StarsRate";
import { sendScore } from "../../util/api/score_ias";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export const FramerModal = ({handleClose, id_ia, title, score}) => {
  const [filledStars, setFilledStars] = useState(0);
  const router = useRouter();

  const { user } = useContext(UserContext);

  async function handleSendScore() {
    if(filledStars === 0) return toast.error('Debes seleccionar una calificación');
    await sendScore({ id_ia: id_ia, stars: filledStars, userId:user.id, voteBy: user.id});
    toast.success('Calificación enviada');
    router.reload();
    
  }
  return (
    // <Backdrop onClick={handleClose}>
      // <motion.section
      //   onClick={(e) => e.stopPropagation()}
      //   className="modal dark:bg-white  z-[100] bg-black  m-auto py-0 px-8 border-[12px] flex flex-col items-center"
      //   variants={flip}
      //   initial="hidden"
      //   animate="visible"
      //   exit="exit"
      // >    
      <section className="h-64 w-full dark:bg-white  bg-black  m-auto py-0 px-8  flex flex-col items-center justify-center">
        <h2 className="text-white dark:text-black font-extrabold text-xl mt-6">Califica {title}</h2>
        <StarsRate filledStars={filledStars} setFilledStars={setFilledStars} score={score} />
        <footer className="flex justify-evenly gap-4">
          <ModalButton onClick={handleSendScore} label="Enviar" />
          <ModalButton onClick={handleClose} label="Cerrar" />
        </footer>
      </section>  
        
      // </motion.section>
    // </Backdrop>
  );
}



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
    // opacity: 0,
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
    // opacity: 0,
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
