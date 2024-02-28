import Image from "next/image";
import { BentoItem } from "./BentoItem";

import IA1 from "../../public/screenshot/chat_eco2.webp";
import IA2 from "../../public/screenshot/sport_eco2.webp";
import IA3 from "../../public/screenshot/quiz_eco2.webp";
import IA4 from "../../public/screenshot/desc_eco2.webp";
import IA5 from "../../public/screenshot/resum_eco2.webp";
import IA6 from "../../public/screenshot/cv_eco2.webp";
import IA7 from "../../public/screenshot/dalle_eco2.webp";
import IA8 from "../../public/screenshot/trad_eco2.webp";

const resources = [
  {
    name: "Eco2IA-Chat",
    description:
      "Resuelve tus preguntas de forma rapida y exacta, resolvemos tus dudas de forma corta y acertiva",
    image: IA1,
    pattern: {
      x: -90,
      y: 6,
      squares: [
        [2, 3],
        [1, 4],
      ],
    },
  },
  {
    name: "Eco2IA-SportCoach",
    description:
      "Necesitas hacer ejersicio y no sabes por donde empezar? usa nuestra entrenador personal impulsado con IA y empiza a entrenar con pplanes de entrenamiento basados en tu informacion fisica",
    image: IA2,
    pattern: {
      y: -6,
      squares: [
        [-1, 2],
        [1, 3],
      ],
    },
  },
  {
    name: "Eco2IA-Quiz",
    description:
      "Necesitas generar preguntas para un examen? Necesitas practicar para un examen? usa nuestra IA y practica con ella, te ayudamos a generar preguntas con IA y respuestas con distintas configuraciones segun como lo necesites.",
    image: IA3,
    pattern: {
      y: 32,
      squares: [
        [0, 2],
        [1, 4],
      ],
    },
  },
  {
    name: "Eco2IA-Description",
    description:
      "Necesitas hacer marketing a algun producto y te encuentras bloqueado? Te presentamos nuestra inteligencia artificial enfocada en generar copys para tu producto, comparte de forma simple en redes sociles los copys de tu producto",
    image: IA4,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: "Eco2IA-Resum",
    description:
      "Transforma tus textos y documentos en resúmenes brillantes con nuestra herramienta innovadora. Ingresa o carga contenido, y en segundos, obtén resúmenes poderosos. Descubre la magia de la simplicidad informativa, maximiza tu comprensión y ahorra tiempo. ¡La herramienta definitiva para resumir!",
    image: IA5,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: "Eco2IA-CV",
    description:
      "Crea tu currículum de manera sencilla con nuestra herramienta respaldada por inteligencia artificial. Ingresa tu información y deja que la IA transforme tus habilidades en un currículum impactante. ¡Destaca y avanza en tu carrera de forma innovadora!",
    image: IA6,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: "Eco2IA-Dalle",
    description: "Genera imágenes únicas y creativas a partir de descripciones textuales, abriendo nuevas posibilidades para la creación de contenido visual.",
    image: IA7,
    pattern: {
      x: -60,
      y: 10,
      squares: [
        [1, 2],
        [2, 3],
      ],
    },
  },
  {
    name: "Eco2IA-Traduccion",
    description: "Traduce textos en tiempo real permitiendo a los usuarios comunicarse sin barreras idiomáticas y explorar múltiples idiomas con facilidad.",
    image: IA8,
    pattern: {
      x: 20,
      y: -15,
      squares: [
        [0, 1],
        [-1, 2],
      ],
    },
  },
];

export const ProjectsIA = () => {
  return (
    <>
      <hr className="my-10 h-px bg-gray-600 border-0 dark:bg-gray-700" />

      <section
        className="w-full max-w-[1400px]
    grid lg:grid-cols-10 auto-rows-[30rem] gap-4
    mx-auto pt-6"
      >
        <BentoItem
          title={resources[0].name}
          appliedPrompt={resources[0].description}
          classProp="col-span-10 lg:col-span-4"
        >
          <Image
            className="background transition-scale absolute bottom-0 left-0 top-0
        -z-10 h-full w-full bg-blue-950
        bg-cover bg-center bg-no-repeat opacity-90 bg-blend-luminosity duration-1000 ease-in-out group-hover:scale-110"
            src={IA1}
            alt="image"
            width={600}
            height={600}
          />
        </BentoItem>
        <BentoItem
          title={resources[1].name}
          appliedPrompt={resources[1].description}
          classProp="col-span-10 lg:col-span-6"
        >
          <Image
            className="background transition-scale absolute bottom-0 left-0 top-0
        -z-10 h-full w-full bg-blue-950
        bg-cover bg-center bg-no-repeat opacity-90 bg-blend-luminosity duration-1000 ease-in-out group-hover:scale-110"
            src={IA2}
            alt="image"
            width={600}
            height={600}
          />
        </BentoItem>
        <BentoItem
          title={resources[3].name}
          appliedPrompt={resources[3].description}
          classProp="col-span-10 lg:col-span-6"
        >
          <Image
            className="background transition-scale absolute bottom-0 left-0 top-0
        -z-10 h-full w-full bg-blue-950
        bg-cover bg-center bg-no-repeat opacity-90 bg-blend-luminosity duration-1000 ease-in-out group-hover:scale-110"
            src={IA4}
            alt="image"
            width={600}
            height={600}
          />
        </BentoItem>
        <BentoItem
          title={resources[2].name}
          appliedPrompt={resources[2].description}
          classProp="col-span-10 lg:col-span-4"
        >
          <Image
            className="background transition-scale absolute bottom-0 left-0 top-0
        -z-10 h-full w-full bg-blue-950
        bg-cover bg-center bg-no-repeat opacity-90 bg-blend-luminosity duration-1000 ease-in-out group-hover:scale-110"
            src={IA3}
            alt="image"
            width={600}
            height={600}
          />
        </BentoItem>
        <BentoItem
          title={resources[4].name}
          appliedPrompt={resources[4].description}
          classProp="col-span-10 lg:col-span-5"
        >
          <Image
            className="background transition-scale absolute bottom-0 left-0 top-0
        -z-10 h-full w-full bg-blue-950
        bg-cover bg-center bg-no-repeat opacity-90 bg-blend-luminosity duration-1000 ease-in-out group-hover:scale-110"
            src={IA5}
            alt="image"
            width={600}
            height={600}
          />
        </BentoItem>
        <BentoItem
          title={resources[5].name}
          appliedPrompt={resources[5].description}
          classProp="col-span-10 lg:col-span-5"
        >
          <Image
            className="background transition-scale absolute bottom-0 left-0 top-0
        -z-10 h-full w-full bg-blue-950
        bg-cover bg-center bg-no-repeat opacity-90 bg-blend-luminosity duration-1000 ease-in-out group-hover:scale-110"
            src={IA6}
            alt="image"
            width={600}
            height={600}
          />
        </BentoItem>
        <BentoItem
          title={resources[7].name}
          appliedPrompt={resources[7].description}
          classProp="col-span-10 lg:col-span-4"
        >
          <Image
            className="background transition-scale absolute bottom-0 left-0 top-0
        -z-10 h-full w-full bg-blue-950
        bg-cover bg-center bg-no-repeat opacity-90 bg-blend-luminosity duration-1000 ease-in-out group-hover:scale-110"
            src={IA8}
            alt="image"
            width={600}
            height={600}
          />
        </BentoItem>
        <BentoItem
          title={resources[6].name}
          appliedPrompt={resources[6].description}
          classProp="col-span-10 lg:col-span-6"
        >
          <Image
            className="background transition-scale absolute bottom-0 left-0 top-0
        -z-10 h-full w-full bg-blue-950
        bg-cover bg-center bg-no-repeat opacity-90 bg-blend-luminosity duration-1000 ease-in-out group-hover:scale-110"
            src={IA7}
            alt="image"
            width={600}
            height={600}
          />
        </BentoItem>

      </section>
    </>
  );
};
