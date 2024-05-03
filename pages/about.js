import Image from 'next/image';
import { motion } from 'framer-motion';
import { features, classNames } from '../constants/constans';

export default function About() {
  return (
    <div className="bg-no-repeat aspect-video w-full bg-cover bg-center bg-[url('/darkWaves.webp')] -mt-16">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl text-eco2MainColor"
          >
            Nuestros Proyectos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 dark:text-lightColor text-md"
          >
            Descubre nuestros proyectos innovadores desarrollados con
            inteligencia artificial que impulsarán tu negocio y agilizarán
            tareas cotidianas reduciendo tiempo en tareas repetitivas.
          </motion.p>
        </div>

        <div className="mt-16 space-y-16">
          {features.map((feature, featureIdx) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, x: featureIdx % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: featureIdx * 0.2 }}
              className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
            >
              <div
                className={classNames(
                  featureIdx % 2 === 0
                    ? 'lg:col-start-1'
                    : 'lg:col-start-8 xl:col-start-9',
                  'mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4'
                )}
              >
                <motion.h3 className="text-4xl font-medium text-eco2MainColor">
                  {feature.name}
                </motion.h3>
                <motion.p className="mt-2 text-lg dark:text-zinc-200">
                  {feature.description}
                </motion.p>
              </div>
              <motion.div
                className={classNames(
                  featureIdx % 2 === 0
                    ? 'lg:col-start-6 xl:col-start-5'
                    : 'lg:col-start-1',
                  'flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8'
                )}
              >
                <div className="aspect-h-2 aspect-w-5 overflow-hidden rounded-lg bg-gray-100">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="object-cover object-center"
                  >
                    <Image
                      width="800"
                      height="600"
                      src={feature.imageSrc}
                      alt={feature.imageAlt}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
