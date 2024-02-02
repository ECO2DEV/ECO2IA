import Image from "next/image";
import { motion } from "framer-motion";
import IA1 from "../public/IA1.webp";
import IA2 from "../public/IA2.webp";
import IA3 from "../public/IA3.webp";
import IA4 from "../public/IA4.webp";
import IA5 from "../public/IA5.webp";
import IA6 from "../public/IA6.webp";

// import { DataAbout } from '../data/about';

// import { values, stats } from '../constants/constans';

const features = [
  {
    name: "Eco2-chat",
    description:
      "Sumérgete en un mundo de respuestas rápidas y precisas. Aquí, despejamos tus dudas con la velocidad de un destello y la certeza de un reloj suizo. Cada pregunta es recibida con entusiasmo y respondida con la agilidad de la maestría, fusionando la simplicidad con la excelencia para proporcionarte soluciones que son tan rápidas como exactas. Bienvenido a nuestro santuario de conocimiento, donde la claridad reina y las respuestas son gemas de sabiduría ofrecidas con la velocidad y eficacia que buscas.",
    imageSrc: IA1,
    imageAlt:
      "White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.",
  },
  {
    name: "Eco2-SportCoach",
    description:
      "Descubre la puerta de entrada a tu viaje fitness con nuestro entrenador personal impulsado por inteligencia artificial. ¿Perdido en el inicio de tu ruta de ejercicios? Permítenos guiarte con planes de entrenamiento diseñados específicamente para ti, basados en tu información física. Abre la puerta a una experiencia de entrenamiento personalizada y eficiente, donde la tecnología se une a tu bienestar para brindarte la dirección que necesitas. ¡Comienza tu viaje fitness hoy mismo con la guía experta de nuestra IA impulsada por la excelencia en el cuidado de tu cuerpo!",
    imageSrc: IA2,
    imageAlt: "Detail of zipper pull with tan leather and silver rivet.",
  },
  {
    name: "Eco2-Quiz",
    description:
      "Simplifica la preparación para tus exámenes con nuestra herramienta impulsada por inteligencia artificial. ¿Te enfrentas a la tarea de crear preguntas para un examen o simplemente necesitas practicar? Únete a nosotros y aprovecha nuestra IA para generar preguntas y respuestas adaptadas a tus necesidades. Facilitamos el proceso al proporcionarte distintas configuraciones, permitiéndote practicar de manera efectiva y enfocada. Deja que nuestra tecnología te guíe en el camino hacia el éxito académico, facilitándote la tarea de preparación con una herramienta personalizada y eficiente.",
    imageSrc: IA3,
    imageAlt: "Detail of zipper pull with tan leather and silver rivet.",
  },
  {
    name: "Eco2-Description",
    description:
      "Supera los obstáculos en tu estrategia de marketing con nuestra herramienta de inteligencia artificial especializada en la creación de copys para productos. ¿Te sientes bloqueado al intentar promocionar un producto? Descubre la solución perfecta con nuestra IA, diseñada para generar copys cautivadores y efectivos. Comparte de manera sencilla en tus redes sociales los mensajes persuasivos y atractivos que nuestra tecnología puede crear para destacar las características únicas de tu producto. Simplifica tu tarea de marketing y despierta el interés de tu audiencia con copys personalizados y convincentes que resonarán en el mundo digital. ¡Potencia tu presencia en línea con la creatividad impulsada por la inteligencia artificial!",
    imageSrc: IA4,
    imageAlt: "Detail of zipper pull with tan leather and silver rivet.",
  },
  {
    name: "Eco2-Resum",
    description:
      "Desata el poder de la síntesis con nuestra innovadora herramienta: un genio literario digital que transforma tus textos y documentos en resúmenes brillantes. Ingresa tu contenido o carga documentos, y en un abrir y cerrar de ojos, nuestra herramienta desentraña la esencia, destilando la esencia de tus palabras en resúmenes concisos y poderosos. Descubre la magia de la simplicidad informativa, donde cada palabra cuenta y cada idea brilla. Simplifica tu lectura, maximiza tu comprensión y libera tu tiempo con la herramienta definitiva para resumir.",
    imageSrc: IA5,
    imageAlt: "Detail of zipper pull with tan leather and silver rivet.",
  },
  {
    name: "Eco2-CV",
    description:
      "Desata tu potencial profesional con nuestra herramienta de creación de currículums respaldada por inteligencia artificial. Simplifica el proceso con un toque creativo: simplemente ingresa tu información y deja que la magia de la IA transforme tus habilidades y experiencia en un currículum impactante. Diseñar tu trayectoria profesional nunca fue tan fácil ni tan innovador. ¡Destaca con un currículum que refleja tu brillantez y deja que la inteligencia artificial potencie tu camino hacia el éxito laboral!",
    imageSrc: IA6,
    imageAlt: "Detail of zipper pull with tan leather and silver rivet.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function About() {
  return (
    <div className="dark:bg-zinc-900 dark:text-zinc-200 dark:hover:ring-white/20">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl text-[#21c284]"
          >
            Nuestros Proyectos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 dark:text-zinc-300 text-md"
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
                    ? "lg:col-start-1"
                    : "lg:col-start-8 xl:col-start-9",
                  "mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4"
                )}
              >
                <motion.h3 className="text-4xl font-medium text-[#21c284]">
                  {feature.name}
                </motion.h3>
                <motion.p className="mt-2 text-lg dark:text-zinc-200">
                  {feature.description}
                </motion.p>
              </div>
              <motion.div
                className={classNames(
                  featureIdx % 2 === 0
                    ? "lg:col-start-6 xl:col-start-5"
                    : "lg:col-start-1",
                  "flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8"
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
