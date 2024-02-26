import { DataHero } from "../../data/hero";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero({ user }) {
  // Define tus variantes de animación
  const textVariants = {
    offscreen: {
      y: 100,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  const buttonVariants = {
    offscreen: {
      scale: 0.8,
      opacity: 0,
    },
    onscreen: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="relative isolate px-6 pt-44 lg:px-8 text-white">
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-sm"></div>

      <div className="mx-auto max-w-3xl sm:py-46 lg:pb-48 pb-48">
        {/* ... */}
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          variants={textVariants}
          className="text-center sm:mb-8 sm:flex sm:justify-center"
        >
          <p className="text-lg leading-8 text-emerald-500">
            {DataHero.hero_description}
          </p>
        </motion.div>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.9 }}
          variants={textVariants}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-green-300 sm:text-6xl">
            {DataHero.hero_maintext}
          </h1>
        </motion.div>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.9 }}
          variants={textVariants}
          className="text-center mt-6 relative rounded-full py-1 px-3 text-sm leading-6 text-white ring-1 ring-gray-900/10 hover:ring-gray-900/20"
        >
          <a
            href={"/about"}
            className="font-semibold text-green-600 hover:text-green-300"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            {DataHero.hero_readmore}
            <span aria-hidden="true">&rarr;</span>
          </a>
        </motion.div>

        <motion.button
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 1 }}
          variants={buttonVariants}
          className="mx-auto mt-8 relative border hover:border-emerald-600 duration-500 group cursor-pointer text-sky-50 overflow-hidden h-14 w-56 rounded-md bg-emerald-800 p-2 flex justify-center items-center font-extrabold"
        >
          <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-900 delay-150 group-hover:delay-75"></div>
          <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-800 delay-150 group-hover:delay-100"></div>
          <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-700 delay-150 group-hover:delay-150"></div>
          <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-600 delay-150 group-hover:delay-200"></div>
          <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-500 delay-150 group-hover:delay-300"></div>
          <Link
            href={user ? "/dashboard" : "/auth/signin"}
            className="z-10 bg-transparent"
          >
            {DataHero.hero_getstarted}
          </Link>
        </motion.button>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-sm"></div>
    </div>
  );
}
