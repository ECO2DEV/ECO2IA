
import Bento from '../ui/Bento';
import { motion } from "framer-motion";
export default function ImageStep({ formData, uploadImage }) {
  return (
    <motion.div
    className='px-4'
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.8,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01]
    }}
    >
      <label
        htmlFor="canvas"
        // className={
        //   'flex flex-col items-center transition-all duration-500  w-96 h-fit md:w-[32rem]  lg:w-[40rem]  mx-auto border-2 rounded-lg cursor-pointer border border-dashed border-gray-800'
        // }
        className={`flex flex-col items-center transition-all duration-500  w-96 h-fit md:w-[32rem] lg:w-[40rem]  mx-auto border-2 rounded-lg cursor-pointer ${
          formData.selectFile
            ? 'border-solid border-green-600'
            : 'border-dashed hover:border-yellow-600 hover:animate-pulse duration-700 border-gray-600'
        }`}
      >
        {formData?.selectFile ? (
          <p>Already image selected</p>
        ) : (
          <p>Click here, select a png image below to 4mb 👇</p>
        )}

        <input
          className="sr-only"
          type="file"
          accept="image/*"
          id="canvas"
          name="originalImage"
          onChange={uploadImage}
        />
      </label>

      <Bento />
    </motion.div>
  );
}
