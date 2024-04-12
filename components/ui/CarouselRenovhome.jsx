
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { DropdownPoints } from "../ui/DropdownPoints";
import {ArrowLeft, ArrowRigth} from "../icons/icons";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export const Carousel = ({images = []}) => {

  // console.log("images", images)
  
  const [[page, direction], setPage] = useState([0, 0]);
  const [showDropdown, setShowDropdown] = useState(false);
  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);


  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="w-screen h-screen relative flex justify-center md:items-center relative">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          className="absolute max-w-[100vw] max-h-[100vh]"
          onLoad={() => setShowDropdown(true)}
          key={page}
          src={
            images[imageIndex].b64_json &&
            `data:image/jpeg;base64,${images[imageIndex].b64_json}`
          }
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
        <div
          className={`${
            showDropdown ? 'absolute flex justify-center  z-10 top-0' : 'hidden'
          }`}
        >
          <DropdownPoints imageSrc={images[imageIndex].b64_json} />
        </div>
      </AnimatePresence>

      <div className="next z-20 cursor-pointer hover:opacity-80 transition-opacity absolute top-1/2 right-[2%] md:right-[10%] bg-black dark:bg-white w-10 h-10 rounded-full text-white dark:text-black flex justify-center items-center text-2xl" onClick={() => paginate(1)}>
        <ArrowRigth/>
      </div>
      <div className="prev z-20 cursor-pointer hover:opacity-80 transition-opacity absolute top-1/2 left-[2%] md:left-[10%] bg-black dark:bg-white w-10 h-10 rounded-full text-white dark:text-black flex justify-center items-center text-2xl" onClick={() => paginate(-1)}>
        <ArrowLeft />
      </div>
    </div>
  );
};
