import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, StarFill } from "../icons/icons";

export const StarsButton = ({isModalOpen,setIsModalOpen, score, title}) => {

  const close = () => setIsModalOpen(false);
  const open = () => setIsModalOpen(true);
  const [average, setAverage] = useState(0);
  


  useEffect(() => {
    if (score.length > 0) {
      const total = score.reduce((acc, el) => acc + el.attributes.stars, 0);
      const average = total / score.length;
      setAverage(average);
    } else {
      setAverage(0);
    }
  }, [score]);

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.ceil(average)) {
      stars.push(<StarFill key={i} />);
    } else {
      stars.push(<Star key={i} />);
    }
  }
  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={`Califica a ${title} 👍`}
 
        onClick={() => (isModalOpen ? close() : open())}
        className="flex items-center gap-1 p-2 bg-darkBgCard dark:bg-darkColor rounded-lg hover:text-none"
      >
       {stars}  
      
      </motion.button>
    </div>
 )
}
