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
    <div className="relative isolate px-6 pt-20 lg:px-8 text-white">
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
          <p className="text-lg leading-8 text-eco2MainColor">
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
          <h1 className="text-4xl font-bold tracking-tight text-eco2MainColor sm:text-6xl">
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
            className="font-semibold text-eco2MainColor hover:text-green-300"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            {DataHero.hero_readmore}
            <span aria-hidden="true">&rarr;</span>
          </a>
        </motion.div>
        <Link
          href={user ? "/dashboard" : "/auth/signin"}
          className="z-10 bg-transparent"
        >
          <motion.button
            className="mx-auto mt-8 relative border hover:border-eco2MainColor duration-500 group cursor-pointer text-sky-50 overflow-hidden h-14 w-56 rounded-md bg-eco2MainColor p-2 flex justify-center items-center font-extrabold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {DataHero.hero_getstarted}
          </motion.button>
        </Link>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-sm"></div>
    </div>
  );
}
