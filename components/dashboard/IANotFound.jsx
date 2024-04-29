
import { useHover } from '@uidotdev/usehooks'
import { motion } from 'framer-motion'
export const IANotFound = () => {

  const [ref, hovering] = useHover();
  return (
    <motion.article

    ref={ref}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay:  0.1, duration: 0.3 }}
    viewport={{ once: true }}
    className={`relative flex flex-col rounded-3xl bg-eco2HoverColor p-6 gap-3 border-2  overflow-hidden col-span-8 row-span-1 sm:row-span-2 md:row-span-3  dark:bg-darkColor md:p-8  ${
      1 % 2 === 0
        ? 'md:row-span-4 lg:col-span-4'
        : 'md:row-span-3 lg:col-span-4'
    }`}
  >   <div className="flex flex-col gap-3">
        <div className="flex items-center justify-start gap-5 opacity-50 z-[1]">
          <p className="font-semibold uppercase">No se encontró ninguna IA</p>
        </div>
        <div className="flex flex-col gap-1 z-[1]">
          <p className="text-base">
            Lo sentimos, no hay ninguna IA disponible que coincida con tu
            búsqueda.
          </p>
        </div>
      </div>
    </motion.article>
  );
}
