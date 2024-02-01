import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

import { GridPattern } from '../GridPattern'
import IA1 from '../../public/IA1.png'
import IA2 from '../../public/IA2.png'
import IA3 from '../../public/IA3.png'
import IA4 from '../../public/IA4.png'
import IA5 from '../../public/IA5.png'
import IA6 from '../../public/IA6.png'
import Image from 'next/image'

const resources = [
  {
    name: 'Eco2IA-Chat',
    description:
      'Resuelve tus preguntas de forma rapida y exacta, resolvemos tus dudas de forma corta y acertiva',
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
    name: 'Eco2IA-SportCoach',
    description:
      'Necesitas hacer ejersicio y no sabes por donde empezar? usa nuestra entrenador personal impulsado con IA y empiza a entrenar con pplanes de entrenamiento basados en tu informacion fisica',
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
    name: 'Eco2IA-Quiz',
    description:
      'Necesitas generar preguntas para un examen? Necesitas practicar para un examen? usa nuestra IA y practica con ella, te ayudamos a generar preguntas con IA y respuestas con distintas configuraciones segun como lo necesites.',
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
    name: 'Eco2IA-Description',
    description:
      'Necesitas hacer marketing a algun producto y te encuentras bloqueado? Te presentamos nuestra inteligencia artificial enfocada en generar copys para tu producto, comparte de forma simple en redes sociles los copys de tu producto',
    image: IA4,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: 'Eco2IA-Resum',
    description:
      'Transforma tus textos y documentos en resúmenes brillantes con nuestra herramienta innovadora. Ingresa o carga contenido, y en segundos, obtén resúmenes poderosos. Descubre la magia de la simplicidad informativa, maximiza tu comprensión y ahorra tiempo. ¡La herramienta definitiva para resumir!',
    image: IA5,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: 'Eco2IA-CV',
    description:
      'Crea tu currículum de manera sencilla con nuestra herramienta respaldada por inteligencia artificial. Ingresa tu información y deja que la IA transforme tus habilidades en un currículum impactante. ¡Destaca y avanza en tu carrera de forma innovadora!',
    image: IA6,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
]

function ResourcePattern({ mouseX, mouseY, ...gridProps }) {
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-black/1 dark:stroke-white/2.5"
          {...gridProps}
        />
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#39fb86] to-[#0804eb] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#324e3d] dark:to-[#43575f]"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
          {...gridProps}
        />
      </motion.div>
    </div>
  )
}

function Resource({ resource }) {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      onMouseMove={onMouseMove}
      className="group relative flex flex-col rounded-2xl bg-neutral-900 transition-shadow hover:shadow-md hover:shadow-green-900/1 dark:bg-white/2.5 dark:hover:shadow-black/5"
    >
      <ResourcePattern {...resource.pattern} mouseX={mouseX} mouseY={mouseY} />
      <div className="relative rounded-2xl px-4 pb-4 pt-16">
        <Image src={resource.image} alt={resource.name} className="w-full h-auto mb-4" />
        <h3 className="mt-4 text-xl font-semibold leading-7 text-white">
          <span className="absolute inset-0 rounded-2xl" />
          {resource.name}
        </h3>
        <p className="mt-1 text-xl text-zinc-600 dark:text-zinc-100">
          {resource.description}
        </p>
      </div>
    </div>
  )
}

export function ProjectsIA() {
  return (
    <div className="my-16 xl:max-w-none">
      <div className="not-prose mt-4 grid grid-cols-3 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-3">
        {resources.map((resource) => (
          <Resource key={resource.name} resource={resource} />
        ))}
      </div>
    </div>
  )
}
