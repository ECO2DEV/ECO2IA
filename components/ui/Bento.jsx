import Image from 'next/image';
import { BentoItem } from './BentoItem';
const Bento = () => {
  return (
    <section
      className="w-full max-w-[1400px]
    grid lg:grid-cols-10 auto-rows-[30rem] gap-4
    mx-auto pt-6"
    >
      <BentoItem
        title="Testing"
        appliedPrompt="Dado una imagen de una pieza de mobiliario, genera una nueva imagen que incluya muebles adicionales o un rediseño completo de la pieza"
        classProp="col-span-10 lg:col-span-4"
      >
        <Image
          className="background transition-scale absolute bottom-0 left-0 top-0
        -z-10 h-full w-full bg-blue-950
        bg-cover bg-center bg-no-repeat opacity-90 bg-blend-luminosity duration-1000 ease-in-out group-hover:scale-110"
          src="/renovhome/renov_02.webp"
          alt="image"
          width={600}
          height={600}
        />
      </BentoItem>
      <BentoItem
        title="Testing"
        appliedPrompt="Dado una imagen de una pieza de mobiliario, genera una nueva imagen que incluya muebles adicionales o un rediseño completo de la pieza"
        classProp="col-span-10 lg:col-span-6"
      >
        <Image
          className="background transition-scale absolute bottom-0 left-0 top-0
        -z-10 h-full w-full bg-blue-950
        bg-cover bg-center bg-no-repeat opacity-90 bg-blend-luminosity duration-1000 ease-in-out group-hover:scale-110"
          src="/renovhome/renov_01.webp"
          alt="image"
          width={600}
          height={600}
        />
      </BentoItem>
      <BentoItem
        title="Testing"
        appliedPrompt="Dado una imagen de una pieza de mobiliario, genera una nueva imagen que incluya muebles adicionales o un rediseño completo de la pieza"
        classProp="col-span-10 lg:col-span-6"
      >
        <Image
          className="background transition-scale absolute bottom-0 left-0 top-0
        -z-10 h-full w-full bg-blue-950
        bg-cover bg-center bg-no-repeat opacity-90 bg-blend-luminosity duration-1000 ease-in-out group-hover:scale-110"
          src="/renovhome/renov_04.webp"
          alt="image"
          width={600}
          height={600}
        />
      </BentoItem>
      <BentoItem
        title="Testing"
        appliedPrompt="Dado una imagen de una pieza de mobiliario, genera una nueva imagen que incluya muebles adicionales o un rediseño completo de la pieza"
        classProp="col-span-10 lg:col-span-4"
      >
        <Image
          className="background transition-scale absolute bottom-0 left-0 top-0
        -z-10 h-full w-full bg-blue-950
        bg-cover bg-center bg-no-repeat opacity-90 bg-blend-luminosity duration-1000 ease-in-out group-hover:scale-110"
          src="/renovhome/renov_03.webp"
          alt="image"
          width={600}
          height={600}
        />
      </BentoItem>
    </section>
  );
};

export default Bento;
