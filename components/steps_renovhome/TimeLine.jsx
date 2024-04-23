
import { motion } from 'framer-motion';
import { steps } from '../../constants/constans';

export default function TimeLine() {
  return (
    <nav className="absolute top-44 left-[38%] xl:top-56 z-10" aria-label="Progress">
      <div className="absolute -top-10 -right-12 -z-[1] m-auto w-full rounded-full bg-black/50 blur-2xl md:size-[350px]"/>
      <ol role="list" className="space-y-4">
        {steps.map((step) => (
          <motion.li
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1.1 }}
            drag="x"
            dragConstraints={{ left: -100, right: 100 }}
            key={step.name}
            className="md:flex-1"
          >
            {step.status === 'complete' ? (
              <div className="group flex flex-col border-l-8 border-eco2MainColor py-2 pl-4 ">
                <span className="text-sm font-bold text-white group-hover:text-gray-100">
                  {step.id}
                </span>
                <span className="text-sm font-bold text-cyan-100 ">
                  {step.title}
                </span>
              </div>
            ) : step.status === 'current' ? (
              <div
                className="flex flex-col border-l-8 border-blue-500 py-2 pl-4 "
                aria-current="step"
              >
                <span className="text-sm font-bold text-white">{step.id}</span>
                <span className="text-sm font-bold text-white">
                  {step.title}
                </span>
              </div>
            ) : (
              <div className="group flex flex-col border-l-8 border-white py-2 pl-4 hover:border-gray-400 ">
                <span className="text-sm font-bold text-white group-hover:text-gray-700">
                  {step.id}
                </span>
                <span className="text-white text-sm font-bold">
                  {step.title}
                </span>
              </div>
            )}
          </motion.li>
        ))}
      </ol>
    </nav>
  );
}
